let server:string;

const dev = process.env.NODE_ENV !== "production";

dev ? server = "http://localhost:3000" : server = "https://ticket-ochre.vercel.app"

export { server };

