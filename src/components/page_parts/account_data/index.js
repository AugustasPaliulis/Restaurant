"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseAuthUser } from "@/context/firebase/auth/context";
import styles from "./AccountData.module.scss";
import Input from "@/components/input";
import ToolTip from "@/components/info_tooltip";

const AccountData = () => {
  const user = useContext(FirebaseAuthUser);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const emailToolTip = () => {
    return <div>You can change your email here</div>;
  };
  useEffect(() => {
    if (!user.user && !user.loadingUser) {
      router.push("/signup");
    } else if (user.user && user.user.email) {
      setEmail(user.user.email);
    }
  }, [user]);
  return (
    <div className={styles.dataContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Account Data</h1>
        <p className={styles.verifiedDisclaimer}>
          {user.user && user.user.emailVerified ? "Verified" : null}
        </p>
      </div>

      <Input
        type="email"
        placeholder="New email"
        value={email}
        label="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        tooltip={<ToolTip text={emailToolTip()} />}
      />
    </div>
  );
};

export default AccountData;
