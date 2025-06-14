export default function ResultBlock({ text }: { text: string }) {
  return (
    <div className="p-4 mt-4 border rounded-xl bg-gray-100">
      <pre>{text}</pre>
    </div>
  )
}
