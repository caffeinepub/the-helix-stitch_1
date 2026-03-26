import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Loader2,
  LogIn,
  LogOut,
  Package,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import type { Order } from "../backend";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

type OrderWithNew = [Order, boolean];

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / BigInt(1_000_000));
  return new Date(ms).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { actor, isFetching } = useActor();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [orders, setOrders] = useState<OrderWithNew[]>([]);
  const [newCount, setNewCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkingRole, setCheckingRole] = useState(false);

  const loadOrders = useCallback(async () => {
    if (!actor || !isAdmin) return;
    setLoading(true);
    try {
      const [count, rawOrders] = await Promise.all([
        actor.getNewOrderCount(),
        actor.getOrders(),
      ]);
      setNewCount(Number(count));
      const sorted = [...rawOrders].sort((a, b) =>
        Number(b[0].timestamp - a[0].timestamp),
      );
      setOrders(sorted);
      await actor.markOrdersSeen();
    } finally {
      setLoading(false);
    }
  }, [actor, isAdmin]);

  useEffect(() => {
    if (!actor || isFetching) return;
    if (!identity) {
      setIsAdmin(null);
      return;
    }
    setCheckingRole(true);
    actor
      .isCallerAdmin()
      .then((result) => {
        setIsAdmin(result);
        setCheckingRole(false);
      })
      .catch(() => {
        setIsAdmin(false);
        setCheckingRole(false);
      });
  }, [actor, identity, isFetching]);

  useEffect(() => {
    if (isAdmin === true) {
      loadOrders();
    }
  }, [isAdmin, loadOrders]);

  const isLoggedIn = !!identity;

  return (
    <main
      className="min-h-screen py-12 px-4"
      style={{ background: "oklch(0.94 0.022 80)" }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1
                className="font-serif text-3xl sm:text-4xl uppercase tracking-widest"
                style={{ color: "oklch(0.22 0.02 60)" }}
              >
                Admin Panel
              </h1>
              <p
                className="text-sm font-sans mt-1"
                style={{ color: "oklch(0.47 0.025 55)" }}
              >
                The Spiral Stitch — Order Management
              </p>
            </div>
            {isLoggedIn && (
              <Button
                data-ocid="admin.secondary_button"
                variant="outline"
                onClick={clear}
                className="flex items-center gap-2 text-xs tracking-widest"
                style={{
                  borderColor: "oklch(0.45 0.08 55)",
                  color: "oklch(0.45 0.08 55)",
                }}
              >
                <LogOut size={14} />
                LOGOUT
              </Button>
            )}
          </div>

          {/* Not logged in */}
          {!isLoggedIn && (
            <div className="flex items-center justify-center min-h-[50vh]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl p-10 text-center max-w-sm w-full shadow-card"
                style={{ background: "oklch(0.97 0.015 80)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "oklch(0.90 0.03 70)" }}
                >
                  <LogIn size={28} style={{ color: "oklch(0.45 0.08 55)" }} />
                </div>
                <h2
                  className="font-serif text-2xl mb-2"
                  style={{ color: "oklch(0.22 0.02 60)" }}
                >
                  Admin Login
                </h2>
                <p
                  className="text-sm font-sans mb-8"
                  style={{ color: "oklch(0.47 0.025 55)" }}
                >
                  Sign in to manage orders for The Spiral Stitch.
                </p>
                <Button
                  data-ocid="admin.primary_button"
                  onClick={login}
                  disabled={isLoggingIn || isInitializing}
                  className="w-full py-5 text-sm tracking-widest"
                  style={{ background: "oklch(0.45 0.08 55)", color: "white" }}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> SIGNING
                      IN...
                    </>
                  ) : (
                    "SIGN IN"
                  )}
                </Button>
              </motion.div>
            </div>
          )}

          {/* Checking role / Loading */}
          {isLoggedIn && (checkingRole || isFetching) && (
            <div
              data-ocid="admin.loading_state"
              className="flex items-center justify-center min-h-[30vh]"
            >
              <Loader2
                size={32}
                className="animate-spin"
                style={{ color: "oklch(0.45 0.08 55)" }}
              />
            </div>
          )}

          {/* Access denied */}
          {isLoggedIn && !checkingRole && !isFetching && isAdmin === false && (
            <motion.div
              data-ocid="admin.error_state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl p-10 text-center max-w-sm mx-auto shadow-card"
              style={{ background: "oklch(0.97 0.015 80)" }}
            >
              <ShieldAlert
                size={48}
                className="mx-auto mb-4"
                style={{ color: "oklch(0.55 0.12 30)" }}
              />
              <h2
                className="font-serif text-2xl mb-2"
                style={{ color: "oklch(0.22 0.02 60)" }}
              >
                Access Denied
              </h2>
              <p
                className="text-sm font-sans"
                style={{ color: "oklch(0.47 0.025 55)" }}
              >
                You don't have admin access. Contact Pal if you think this is a
                mistake.
              </p>
            </motion.div>
          )}

          {/* Admin dashboard */}
          <AnimatePresence>
            {isLoggedIn && !checkingRole && !isFetching && isAdmin === true && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* New orders badge */}
                {newCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 rounded-2xl px-5 py-4 mb-6"
                    style={{
                      background: "oklch(0.87 0.06 55)",
                      border: "1px solid oklch(0.75 0.08 55)",
                    }}
                  >
                    <Bell size={18} style={{ color: "oklch(0.22 0.02 60)" }} />
                    <span
                      className="font-sans font-bold text-sm"
                      style={{ color: "oklch(0.22 0.02 60)" }}
                    >
                      {newCount} new {newCount === 1 ? "order" : "orders"} since
                      your last visit!
                    </span>
                  </motion.div>
                )}

                {/* Summary + Refresh */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Package
                      size={20}
                      style={{ color: "oklch(0.45 0.08 55)" }}
                    />
                    <span
                      className="font-sans font-bold"
                      style={{ color: "oklch(0.22 0.02 60)" }}
                    >
                      {orders.length} total{" "}
                      {orders.length === 1 ? "order" : "orders"}
                    </span>
                  </div>
                  <Button
                    data-ocid="admin.secondary_button"
                    variant="outline"
                    onClick={loadOrders}
                    disabled={loading}
                    className="flex items-center gap-2 text-xs tracking-widest"
                    style={{
                      borderColor: "oklch(0.45 0.08 55)",
                      color: "oklch(0.45 0.08 55)",
                    }}
                  >
                    {loading ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <RefreshCw size={14} />
                    )}
                    REFRESH
                  </Button>
                </div>

                {/* Orders list */}
                {loading && orders.length === 0 ? (
                  <div
                    data-ocid="admin.loading_state"
                    className="flex justify-center py-16"
                  >
                    <Loader2
                      size={32}
                      className="animate-spin"
                      style={{ color: "oklch(0.45 0.08 55)" }}
                    />
                  </div>
                ) : orders.length === 0 ? (
                  <div
                    data-ocid="admin.empty_state"
                    className="rounded-3xl p-12 text-center"
                    style={{ background: "oklch(0.97 0.015 80)" }}
                  >
                    <Package
                      size={48}
                      className="mx-auto mb-4"
                      style={{ color: "oklch(0.70 0.03 70)" }}
                    />
                    <p
                      className="font-sans text-sm"
                      style={{ color: "oklch(0.47 0.025 55)" }}
                    >
                      No orders yet. Share your custom order link to get
                      started!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map(([order, isNew], idx) => (
                      <motion.div
                        key={String(order.id)}
                        data-ocid={`admin.item.${idx + 1}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="rounded-2xl p-6"
                        style={{
                          background: "oklch(0.97 0.015 80)",
                          border: isNew
                            ? "2px solid oklch(0.65 0.1 55)"
                            : "1px solid oklch(0.89 0.02 75)",
                        }}
                      >
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span
                                  className="font-serif text-lg"
                                  style={{ color: "oklch(0.22 0.02 60)" }}
                                >
                                  {order.name}
                                </span>
                                {isNew && (
                                  <Badge
                                    className="text-xs font-sans tracking-wide"
                                    style={{
                                      background: "oklch(0.65 0.1 55)",
                                      color: "white",
                                    }}
                                  >
                                    NEW
                                  </Badge>
                                )}
                              </div>
                              <p
                                className="text-xs font-sans mt-0.5"
                                style={{ color: "oklch(0.55 0.03 60)" }}
                              >
                                {formatDate(order.timestamp)}
                              </p>
                            </div>
                          </div>
                          <span
                            className="text-xs font-sans uppercase tracking-widest px-3 py-1 rounded-full"
                            style={{
                              background: "oklch(0.90 0.03 70)",
                              color: "oklch(0.45 0.08 55)",
                            }}
                          >
                            {order.category}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <p
                              className="text-xs uppercase tracking-widest font-sans mb-0.5"
                              style={{ color: "oklch(0.60 0.03 60)" }}
                            >
                              Email
                            </p>
                            <p
                              className="text-sm font-sans"
                              style={{ color: "oklch(0.35 0.025 60)" }}
                            >
                              {order.email}
                            </p>
                          </div>
                          {order.phone && (
                            <div>
                              <p
                                className="text-xs uppercase tracking-widest font-sans mb-0.5"
                                style={{ color: "oklch(0.60 0.03 60)" }}
                              >
                                Phone
                              </p>
                              <p
                                className="text-sm font-sans"
                                style={{ color: "oklch(0.35 0.025 60)" }}
                              >
                                {order.phone}
                              </p>
                            </div>
                          )}
                          <div>
                            <p
                              className="text-xs uppercase tracking-widest font-sans mb-0.5"
                              style={{ color: "oklch(0.60 0.03 60)" }}
                            >
                              Quantity
                            </p>
                            <p
                              className="text-sm font-sans"
                              style={{ color: "oklch(0.35 0.025 60)" }}
                            >
                              {String(order.quantity)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <p
                            className="text-xs uppercase tracking-widest font-sans mb-0.5"
                            style={{ color: "oklch(0.60 0.03 60)" }}
                          >
                            Description
                          </p>
                          <p
                            className="text-sm font-sans leading-relaxed"
                            style={{ color: "oklch(0.35 0.025 60)" }}
                          >
                            {order.description}
                          </p>
                        </div>

                        {order.notes && (
                          <div className="mt-3">
                            <p
                              className="text-xs uppercase tracking-widest font-sans mb-0.5"
                              style={{ color: "oklch(0.60 0.03 60)" }}
                            >
                              Notes
                            </p>
                            <p
                              className="text-sm font-sans italic"
                              style={{ color: "oklch(0.47 0.025 55)" }}
                            >
                              {order.notes}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
