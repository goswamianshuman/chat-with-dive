"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAllUsersContext } from "@/context/AllUsersContext";
import { useAuthContext } from "@/context/AuthContext";
import { auth, db, firebaseApp } from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { get, onDisconnect, ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user }: any = useAuthContext(); // Get user from AuthContext
  const { allUsers }: any = useAllUsersContext();

  // console.log(allUsers);

  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  });

  var isOfflineForDatabase = {
    // Offline
    state: "offline",
    email: auth.currentUser?.email,
    lastseen: Date.now(),
  };

  var isOnlineForDatabase = {
    // Online
    state: "online",
    email: auth.currentUser?.email,
  };

  useEffect(() => {
    if (!auth.currentUser) return;
    // Update presence
    get(ref(db, "info/connected")).then(function (snapshot) {
      var userStatusDatabaseRef = ref(db, "/status/" + auth.currentUser?.uid);

      onDisconnect(userStatusDatabaseRef)
        .set(isOfflineForDatabase)
        .then(function () {
          // online status
          set(userStatusDatabaseRef, isOnlineForDatabase);
        });
    });
  }, []);

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/");
      return;
    }
    const { uid, displayName, email, photoURL }: any = auth.currentUser;

    get(ref(db, "users/" + user.uid))
      .then((snapshot) => {
        if (!snapshot.exists()) {
          set(ref(db, "users/" + uid), {
            name: displayName,
            email: email,
            profile_picture: photoURL,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const logout = () => {
    const auth = getAuth(firebaseApp);
    var userStatusDatabaseRef = ref(db, "/status/" + auth.currentUser?.uid);
    set(userStatusDatabaseRef, isOfflineForDatabase);
    auth
      .signOut()
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="h-screen flex flex-col">
      <Navbar
        profilePhoto={user?.photoURL}
        useName={user?.displayName}
        userEmail={user?.email}
        logout={logout}
      />
      <div className="flex-grow flex">
        <Sidebar allUsers={allUsers} />
        <div className="flex-grow">{children}</div>
      </div>
    </main>
  );
}
