"use client";

import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function ModalEditar({ params }: Props) {
  const router = useRouter();
  return (
    <Modal>
      <span onClick={() => router.back()}>Fechar Modal</span>
      <h1>Modal edição Fatura {`# ${params.id}`}</h1>
    </Modal>
  );
}
