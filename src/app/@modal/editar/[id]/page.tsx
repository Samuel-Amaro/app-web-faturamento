import ModalEdit from "@/components/ModalEdit";

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  return <ModalEdit id={params.id} />;
}
