let server:string;

const dev = process.env.NODE_ENV !== "production";

dev ? server = "http://localhost:3000" : server = "https://ticket-nu.vercel.app"

export { server };

