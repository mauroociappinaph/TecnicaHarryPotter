import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const DeleteAccount: React.FC = () => {
  const { auth, eliminarCuenta } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alerta, setAlerta] = useState<{ msg: string; error: boolean }>({
    msg: "",
    error: false,
  });

  const handleDelete = async () => {
    // Validar que auth exista y tenga un id
    if (!auth || !auth.id || typeof auth.id !== "string") {
      setError("No se ha iniciado sesión correctamente.");
      return;
    }

    if (confirmation !== "DELETE") {
      setError("Por favor, escribe DELETE para confirmar.");
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const respuesta = await eliminarCuenta(auth.id);
      setIsOpen(false);
      setAlerta({ msg: respuesta.msg, error: false });
    } catch (error) {
      console.error("Error al borrar la cuenta:", error);
      setAlerta({
        msg: "Hubo un error al intentar borrar la cuenta. Por favor, inténtalo de nuevo.",
        error: true, // Debe ser un objeto con msg y error
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const { msg } = alerta;

  return (
    <div className="my-24">
      {msg && <Alerta alerta={alerta} />}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">Borrar cuenta</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Borrar cuenta</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              tu cuenta y removerá tus datos de nuestros servidores.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="confirmation" className="text-left">
              Escribe DELETE para confirmar
            </Label>
            <Input
              id="confirmation"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              className="col-span-3"
            />
            {error && (
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Borrando...
                </>
              ) : (
                "Borrar cuenta"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteAccount;
