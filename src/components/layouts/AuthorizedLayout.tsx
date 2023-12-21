import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../../clients/supabase";
import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";

export const AuthorizedLayout = () => {
   const [session, setSession] = useState<null | Session>(null);

   useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
         setSession(session);
      });

      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
         setSession(session);
      });

      return () => subscription.unsubscribe();
   }, []);

   if (!session) {
      return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
   }

   return (
      <div>
         <Header />
         <Outlet />
      </div>
   );
};
