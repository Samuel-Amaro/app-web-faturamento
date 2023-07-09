"use client";

import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

export default function ModalCriar() {
  const router = useRouter();
  return (
    <Modal>
      <span onClick={() => router.back()}>Fechar Modal</span>
      <h1>Modal Criar Fatura</h1>
    </Modal>
  );
}
