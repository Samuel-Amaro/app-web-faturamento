import ModalExcluir from "@/components/ModalDelete";

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  return <ModalExcluir id={params.id} />;
}
