import { SessionProvider } from "../components/SessionProvider";
import SideBar from "../components/SideBar";
import "../styles/globals.css";
// Now, getServerSession is no longer unstable
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import ClientProvider from "../components/ClientProvider";
export const metadata = {
  title: "ChatGPT Messenger by RCCC 😎",
  description: "Generated by Next.js",
};

// ****SERVER COMPONENTS CAN BE ASYNC!!
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log("The session>>>", session);
  return (
    <html lang="en">
      <title>CGPT-React</title>
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            //  Here, the whole div is the children parameter for SessionProvider
            <div className="flex">
              {/* Sidebar */}
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <SideBar />
              </div>
              {/* Client provider (notifications) */}
              {/* Since layout.tsx is a server component we can not use directly react-hot-toast since it is
              a client component. Therefore, we'll wrap inside the ClientProvider component so that anything 
              that needs a client in the top level we can inject in this level. If we don't define the Toaster
              inside the ClientProvider we would have to define it in every client component.  */}
              <ClientProvider />

              {/* main content */}
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
