export default function BookForm({ form, setForm, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input placeholder="Title" onChange={e => setForm({...form, title:e.target.value})} />
      <input placeholder="Author" onChange={e => setForm({...form, author:e.target.value})} />
      <input type="number" placeholder="Price" onChange={e => setForm({...form, price:e.target.value})} />
      <textarea placeholder="Description" onChange={e => setForm({...form, description:e.target.value})}></textarea>
      <input type="file" onChange={e => setForm({...form, image:e.target.files[0]})} />
      <button>Save</button>
    </form>
  );
}
