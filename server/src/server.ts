import os from "os";
import app from "./app";

function getHostAddresses(): string[] {
    const interfaces = os.networkInterfaces();
    const addresses: string[] = [];
    for (const iface of Object.values(interfaces)) {
        if (iface) {
            for (const alias of iface) {
                if (alias.family === "IPv4" && !alias.internal) {
                    addresses.push(alias.address);
                }
            }
        }
    }
    return addresses;
}

const PORT = Number(process.env.PORT);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Network Address:");
    const addresses = getHostAddresses();
    addresses.forEach((address) => {
        console.log(`- http://${address}:${PORT}`);
    });
});
