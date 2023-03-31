import Header from "components/Header";
import { useContext, useEffect } from "react";
import { AuthContext } from "hooks/useAuth";

export default function MainLayout({ children }) {
  const { refreshSession } = useContext(AuthContext);

  useEffect(() => {
    refreshSession();
  }, []);

  return (
    <>
      <div className="min-h-full">
        <Header />
        {/* <Nav /> */}
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
