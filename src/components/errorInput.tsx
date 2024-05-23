export default function ErrorInput({
  message,
}: {
  message: string | undefined;
}) {
  return message ? (
    <p className="ml-1 text-sm text-red-500">{message}</p>
  ) : null;
}
