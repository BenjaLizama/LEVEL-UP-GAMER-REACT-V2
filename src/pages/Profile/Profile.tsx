import LoginProfileInfo from "@/components/molecules/LoginProfileInfo/LoginProfileInfo";

export default function Profile() {
  const idUsuario = localStorage.getItem("idUsuario");

  return (
    <div>
      {!idUsuario && <LoginProfileInfo />}
      <hr />
    </div>
  );
}
