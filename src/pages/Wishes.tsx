import { useState, useEffect } from "react";
import {
  Wish,
  getItemsByBucket,
  addItem,
  deleteItem,
  updateItem,
} from "../lib/storage";
import { useBucket } from "../hooks/useBucket";
import { useReadOnly } from "../hooks/useReadOnly";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

export function Wishes() {
  const [bucketId] = useBucket();
  const isReadOnly = useReadOnly();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWishTitle, setNewWishTitle] = useState("");

  useEffect(() => {
    if (bucketId) {
      setWishes(getItemsByBucket<Wish>("wishes", bucketId));
    }
  }, [bucketId]);

  const handleAddWish = () => {
    if (bucketId && newWishTitle) {
      const newWish = addItem<Wish>(
        "wishes",
        {
          title: newWishTitle,
          description: "",
          url: null,
          price: null,
          priority: wishes.length + 1,
          status: "planned",
          image: null,
          reactions: {},
          updatedAt: new Date().toISOString(),
        },
        bucketId
      );
      setWishes([...wishes, newWish]);
      setNewWishTitle("");
    }
  };

  const handleDeleteWish = (id: string) => {
    deleteItem("wishes", id);
    setWishes(wishes.filter((wish) => wish.id !== id));
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(wishes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWishes(items);
  };

  const handleReaction = (wish: Wish, reaction: string) => {
    const newReactions = { ...wish.reactions };
    newReactions[reaction] = (newReactions[reaction] || 0) + 1;
    const updatedWish = { ...wish, reactions: newReactions };
    updateItem("wishes", updatedWish);
    setWishes(wishes.map((w) => (w.id === wish.id ? updatedWish : w)));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Wish List</h1>
      <div className="mb-6 rounded-2xl border border-primary/30 bg-primary/10 p-4 shadow-inner">
        <p className="text-xs uppercase tracking-[0.4em] text-primary/80">
          Forever wish
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-primary">Marry</h2>
        <p className="mt-1 text-sm text-text/80">
          Our standing promise, written in every plan we make.
        </p>
      </div>
      {!isReadOnly && (
        <div className="mb-4">
          <input
            type="text"
            value={newWishTitle}
            onChange={(e) => setNewWishTitle(e.target.value)}
            placeholder="New wish..."
            className="bg-secondary text-text px-4 py-2 rounded-lg mr-2"
          />
          <button
            onClick={handleAddWish}
            className="bg-primary hover:bg-secondary text-text font-bold py-2 px-4 rounded-lg"
          >
            Add Wish
          </button>
        </div>
      )}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="wishes">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {wishes.map((wish, index) => (
                <Draggable
                  key={wish.id}
                  draggableId={wish.id}
                  index={index}
                  isDragDisabled={isReadOnly}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center justify-between bg-secondary p-4 rounded-lg mb-2"
                    >
                      <span>{wish.title}</span>
                      <div className="flex items-center">
                        <div className="mr-4">
                          <button
                            onClick={() => handleReaction(wish, "❤️")}
                            className="mr-2"
                          >
                            ❤️ {wish.reactions["❤️"] || 0}
                          </button>
                          <button
                            onClick={() => handleReaction(wish, "🥹")}
                            className="mr-2"
                          >
                            🥹 {wish.reactions["🥹"] || 0}
                          </button>
                          <button
                            onClick={() => handleReaction(wish, "✨")}
                            className="mr-2"
                          >
                            ✨ {wish.reactions["✨"] || 0}
                          </button>
                        </div>
                        {!isReadOnly && (
                          <button
                            onClick={() => handleDeleteWish(wish.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
