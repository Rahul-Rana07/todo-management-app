import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { collectionService } from "../services/collectionService";

export default function useCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalCollections = collections.length;

  async function fetchCollections() {
    try {
      setLoading(true);

      const data = await collectionService.getCollections();

      setCollections(data);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load collections"
      );
    } finally {
      setLoading(false);
    }
  }

  async function createCollection(payload) {
    try {
      const response = await collectionService.createCollection(payload);

      setCollections((prev) => [...prev, response.collection]);

      toast.success("Collection created");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to create collection"
      );
    }
  }

  async function deleteCollection(id) {
    try {
      await collectionService.deleteCollection(id);

      setCollections((prev) =>
        prev.filter((item) => item._id !== id)
      );

      toast.success("Collection deleted");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to delete collection"
      );
    }
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  return {
    collections,
    loading,
    totalCollections,
    createCollection,
    deleteCollection,
    refreshCollections: fetchCollections,
  };
}