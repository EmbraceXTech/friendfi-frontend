import { ModalProvider } from "@particle-network/connectkit";
import { AvalancheTestnet } from "@particle-network/chains";
import { evmWallets } from "@particle-network/connectors";

export default function ParticleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider
      options={{
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
        clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY || "",
        appId: process.env.NEXT_PUBLIC_APP_ID || "",
        chains: [AvalancheTestnet],
        wallet: {
          visible: true,
          // supportChains: [AvalancheTestnet],
          customStyle: {},
        },
        promptSettingConfig: {
          promptPaymentPasswordSettingWhenSign: 1,
          promptMasterPasswordSettingWhenLogin: 1,
        },
        // connectors: evmWallets({
        //   projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
        //   showQrModal: false,
        // }),
      }}
      theme={"light"}
      language={"en"}
      walletSort={["Particle Auth", "Wallet"]}
    >
      {children}
    </ModalProvider>
  );
}
