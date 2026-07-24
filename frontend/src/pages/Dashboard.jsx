import { CheckCircle2, FolderKanban, ListTodo, Clock3  , Search,} from "lucide-react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import EmptyState from "../components/EmptyState";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


import SkeletonCard from "../components/skeletons/SkeletonCard";

import useDashboardStats from "../hooks/useDashboardStats";

import ConfirmModal from "../components/ConfirmModal";

import useCollections from "../hooks/useCollections";

import CollectionCard from "../components/CollectionCard";

import CreateCollectionModal from "../components/CreateCollectionModal";


export default function Dashboard() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState(null);

const {
    collections,
    totalCollections,
    createCollection,
    deleteCollection,
} = useCollections();

const { stats, loading } = useDashboardStats();

function handleDeleteClick(collection) {
  setSelectedCollection(collection);
  setConfirmOpen(true);
}

async function handleConfirmDelete() {
  if (!selectedCollection) return;

  await deleteCollection(selectedCollection._id);

  setConfirmOpen(false);
  setSelectedCollection(null);
}

const filteredCollections = useMemo(() => {
  return collections.filter((collection) =>
    collection.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );
}, [collections, search]);
console.log(collections);

  return (
    <div className="min-h-screen bg-[#09090B]">
     <Navbar 
        onCreateCollection={() => setOpen(true)}
        stats={stats}
     />

      <main className="mx-auto max-w-7xl px-6 py-6 sm:px-6 sm:py-8">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatsCard
  title="Collections"
  value={stats.collections}
  icon={<FolderKanban />}
/>

<StatsCard
  title="Todos"
  value={stats.todos}
  icon={<ListTodo />}
/>

<StatsCard
  title="Completed"
  value={stats.completed}
  icon={<CheckCircle2 />}
/>

<StatsCard
  title="Pending"
  value={stats.pending}
  icon={<Clock3 />}
/>

        </div>
        <div className="relative mt-6 sm:mt-8">
  <Search
    size={18}
    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
  />

  <input
    type="text"
    placeholder="Search collections..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-xl border border-zinc-800 bg-[#17171C] py-3 pl-12 pr-4 text-sm text-white outline-none transition focus:border-amber-400 sm:text-base"
  />
</div>

        <section className="mt-10">

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            </div>
            ) : filteredCollections.length === 0 ? (
            search ? (
  <div className="rounded-2xl border border-dashed border-zinc-700 p-10 text-center text-zinc-500">
    No collections found.
  </div>
) : (
  <EmptyState onCreate={() => setOpen(true)} />
)
            ) : (
            <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredCollections.map((collection) => (
            <CollectionCard
            key={collection._id}
            collection={collection}
            onDelete={handleDeleteClick}
            onClick={() => navigate(`/collection/${collection._id}`)}
            />
            ))}
            </div>
            )}

        </section>

      </main>


      <CreateCollectionModal
    isOpen={open}
    onClose={() => setOpen(false)}
    onCreate={createCollection}
/>

<ConfirmModal
  isOpen={confirmOpen}
  onClose={() => {
    setConfirmOpen(false);
    setSelectedCollection(null);
  }}
  onConfirm={handleConfirmDelete}
  title="Delete Collection"
  message={
    selectedCollection
      ? `Are you sure you want to delete "${selectedCollection.name}"?`
      : ""
  }
/>
    </div>
  );
}