import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Order {
    id: bigint;
    name: string;
    description: string;
    email: string;
    notes: string;
    timestamp: bigint;
    quantity: bigint;
    category: string;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export interface Product {
    name: string;
    description: string;
    image?: ExternalBlob;
    price: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, description: string, image: ExternalBlob | null, price: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(name: string): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getNewOrderCount(): Promise<bigint>;
    getOrders(): Promise<Array<[Order, boolean]>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markOrdersSeen(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitOrder(name: string, email: string, phone: string, category: string, description: string, quantity: bigint, notes: string): Promise<bigint>;
}
