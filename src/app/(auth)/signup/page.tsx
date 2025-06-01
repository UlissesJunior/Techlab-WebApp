"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DialogInput from "@/components/UI/DialogInput";
import DialogButton from "@/components/UI/DialogButton";
import Link from "next/link";
import { userController } from "@/controllers/UserController";
import { accountController } from "@/controllers/AccountController";
import { toast } from "react-toastify";
import DialogSelect from "@/components/UI/DialogSelect";
import {
  amountStringToNumber,
  formatAmount,
  handleAmountInput,
} from "@/lib/transactionDialogUtils";
import { AccountType } from "@/models/account";
import { UserInterface } from "@/models/user";
import { authController } from "@/controllers/AuthController";
import ImageUpload from "@/components/UI/ImageUpload";
import { apiService } from "@/services/ApiService";
import { AccountsProvider } from "@/contexts/AccountsContext";

export default function SignupPage() {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [photo, setPhoto] = useState<File | null>(null);
  const [user, setUser] = useState<UserInterface | null>(null);

  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("CORRENTE");
  const [accountBalance, setAccountBalance] = useState<string | number>("0.00");

  const router = useRouter();

  useEffect(() => {
    const token = authController.getValidToken();

    if (token) {
      apiService.setToken(token);

      const checkAccountsAndRedirect = async () => {
        try {
          accountController.setShowToast(false);
          const accounts = await accountController.getAccounts();
          accountController.setShowToast(true);
          if (accounts?.length === 0) {
            setStep(3);
          } else {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      };

      checkAccountsAndRedirect();
    }
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const createdUser = await userController.createUser({
      name,
      email,
      password,
    });

    if (createdUser) {
      authController.setShowToast(false);
      const acessToken = await authController.login(email, password);
      if (acessToken) {
        setUser(createdUser);
        setStep(2);
      }
    }
    authController.setShowToast(true);
  };

  const handlePhotoUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (photo && user) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result?.toString().split(",")[1];
        try {
          if (user.id) {
            userController.setShowToast(false);
            await userController.uploadPhoto(user.id, base64String!);
            userController.setShowToast(true);
          }
        } finally {
          setStep(3);
        }
      };
      reader.readAsDataURL(photo);
    } else {
      setStep(3);
    }
  };

  const handleAccountCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    accountController.setShowToast(false);
    const account = await accountController.createAccount({
      name: accountName,
      type: accountType,
      balance: amountStringToNumber(accountBalance as string),
    });

    if (account) {
      router.push("/dashboard");
    }
    accountController.setShowToast(true);
  };

  const renderStep3Content = () => (
    <AccountsProvider>
      <form className="space-y-6 sm:space-y-8" onSubmit={handleAccountCreation}>
        <DialogInput
          label="Nome da Conta"
          type="text"
          className="border border-border"
          required
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <DialogSelect
          label="Tipo de Conta"
          options={[
            { id: "CORRENTE", name: "Corrente" },
            { id: "POUPANCA", name: "Poupança" },
            { id: "CREDITO", name: "Crédito" },
            { id: "INVESTIMENTO", name: "Investimento" },
          ]}
          placeholder="Selecione o tipo de conta"
          className="border border-border"
          onChange={(e) => setAccountType(e.target.value as AccountType)}
        />
        <DialogInput
          label="Saldo Inicial"
          type="text"
          className="border border-border"
          value={accountBalance}
          onChange={(e) =>
            setAccountBalance(formatAmount(handleAmountInput(e.target.value)))
          }
        />
        <DialogButton
          type="submit"
          className="bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer"
        >
          Criar Conta
        </DialogButton>
      </form>
    </AccountsProvider>
  );

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
        {step === 1 && "Registre-se em nossa plataforma"}
        {step === 2 && "Envie uma foto de perfil (opcional)"}
        {step === 3 && "Crie sua primeira conta bancária"}
      </h2>

      {step === 1 && (
        <form className="space-y-6 sm:space-y-8" onSubmit={handleSignup}>
          <DialogInput
            label="Nome"
            type="text"
            className="border border-border"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DialogInput
            label="Endereço de email"
            type="email"
            className="border border-border"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <DialogInput
            label="Senha"
            type="password"
            className="border border-border"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <DialogButton
            type="submit"
            className="bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer"
          >
            Registrar-se
          </DialogButton>
        </form>
      )}

      {step === 2 && (
        <form className="space-y-6 sm:space-y-8" onSubmit={handlePhotoUpload}>
          <ImageUpload setPhoto={setPhoto} currentPhoto={photo} />
          <div className="flex gap-4">
            <DialogButton
              type="button"
              className="bg-gray-300 text-black font-semibold hover:bg-gray-400 transition cursor-pointer"
              onClick={() => setStep(3)}
            >
              Pular
            </DialogButton>
            <DialogButton
              type="submit"
              className="bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer"
            >
              Enviar e continuar
            </DialogButton>
          </div>
        </form>
      )}

      {step === 3 && renderStep3Content()}

      {step === 1 && (
        <p className="text-xs sm:text-sm text-center mt-4">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-[#4F46E5] font-semibold">
            Entre
          </Link>
        </p>
      )}
    </div>
  );
}