import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type UserProfile = {
    name : Text;
  };

  public type Order = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    category : Text;
    description : Text;
    quantity : Nat;
    notes : Text;
    timestamp : Int;
  };

  public type Product = {
    name : Text;
    description : Text;
    image : ?Storage.ExternalBlob;
    price : Nat;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let orders = Map.empty<Nat, Order>();
  let products = Map.empty<Text, Product>();
  var nextOrderId = 0;
  var lastSeenOrder : Nat = 0;

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitOrder(
    name : Text,
    email : Text,
    phone : Text,
    category : Text,
    description : Text,
    quantity : Nat,
    notes : Text,
  ) : async Nat {
    let orderId = nextOrderId;

    let order : Order = {
      id = orderId;
      name;
      email;
      phone;
      category;
      description;
      quantity;
      notes;
      timestamp = Time.now();
    };

    orders.add(orderId, order);
    nextOrderId += 1;
    orderId;
  };

  public query ({ caller }) func getOrders() : async [(Order, Bool)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };

    orders.toArray().map<(Nat, Order), (Order, Bool)>(
      func((id, order)) { (order, id >= lastSeenOrder) }
    );
  };

  public shared ({ caller }) func markOrdersSeen() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can mark orders as seen");
    };
    lastSeenOrder := nextOrderId;
  };

  public query ({ caller }) func getNewOrderCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view new order count");
    };
    nextOrderId - lastSeenOrder;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public shared ({ caller }) func addProduct(
    name : Text,
    description : Text,
    image : ?Storage.ExternalBlob,
    price : Nat,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let product : Product = {
      name;
      description;
      image;
      price;
    };

    products.add(name, product);
  };

  public shared ({ caller }) func deleteProduct(name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    products.remove(name);
  };
};
