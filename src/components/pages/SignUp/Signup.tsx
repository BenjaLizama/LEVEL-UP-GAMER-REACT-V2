import React, { useState } from "react";
import Input from "@/components/atoms/Input/Input";
import { EMAIL } from "@/utils/Icons";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const handleTextChange = (newValue: string) => {
    setEmail(newValue);
  };

  return (
    <div>
      <Input
        value={email}
        onValueChange={handleTextChange}
        placeholder="Correo electronico"
        icon={EMAIL}
      />
    </div>
  );
}
