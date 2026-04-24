import React, { useState, useEffect } from "react";

const CATEGORIES = ["All", "Italian", "Asian", "Mexican", "Sides", "Dessert"];

const initialRecipes = [
  {
    id: 1,
    title: "Spaghetti Bolognese",
    category: "Italian",
    image: null,
    time: "45 mins",
    serves: 4,
    description: "A rich, slow-cooked meat sauce over silky pasta.",
    ingredients: ["500g spaghetti", "400g minced beef", "1 onion", "2 garlic cloves", "400g tinned tomatoes", "2 tbsp olive oil", "Salt & pepper"],
    steps: ["Brown the mince in a pan with olive oil.", "Add chopped onion and garlic, cook until soft.", "Pour in tinned tomatoes and simmer for 20 mins.", "Cook spaghetti al dente and serve topped with sauce."]
  },
  {
    id: 2,
    title: "Chicken Tacos",
    category: "Mexican",
    image: null,
    time: "30 mins",
    serves: 2,
    description: "Smoky grilled chicken with fresh salsa in warm tortillas.",
    ingredients: ["2 chicken breasts", "6 small tortillas", "1 lime", "1 avocado", "Fresh coriander", "1 tsp cumin", "1 tsp smoked paprika"],
    steps: ["Season chicken with cumin, paprika, salt and lime juice.", "Grill or pan-fry chicken for 6–7 mins each side.", "Slice chicken and serve in tortillas with sliced avocado and coriander."]
  },
  {
    id: 3,
    title: "Pad Thai",
    category: "Asian",
    image: null,
    time: "25 mins",
    serves: 2,
    description: "Sweet, tangy noodles with prawns and crunchy peanuts.",
    ingredients: ["200g rice noodles", "200g prawns", "2 eggs", "3 tbsp fish sauce", "2 tbsp tamarind paste", "1 tbsp sugar", "Crushed peanuts", "Spring onions"],
    steps: ["Soak noodles in warm water for 20 mins, drain.", "Stir-fry prawns in a hot wok until pink.", "Push to the side, scramble eggs in the pan.", "Add noodles, sauce mix and toss everything together.", "Serve topped with peanuts and spring onions."]
  }
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #faf8f4;
    color: #2c2416;
    font-family: 'Lato', sans-serif;
    min-height: 100vh;
  }

  .app { max-width: 1100px; margin: 0 auto; padding: 0 24px 60px; }

  .header {
    text-align: center;
    padding: 56px 0 36px;
    border-bottom: 1px solid #e8e0d0;
    margin-bottom: 40px;
  }
  .header-label {
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #b5813a;
    margin-bottom: 14px;
  }
  .header h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(42px, 6vw, 72px);
    font-weight: 700;
    color: #1a1208;
    line-height: 1.1;
  }
  .header p {
    font-size: 16px;
    color: #7a6a50;
    margin-top: 12px;
    font-weight: 300;
    letter-spacing: 0.3px;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 16px;
  }
  .categories { display: flex; gap: 8px; flex-wrap: wrap; }
  .cat-btn {
    background: none;
    border: 1.5px solid #d4c9b0;
    color: #7a6a50;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 8px 18px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .cat-btn:hover { border-color: #b5813a; color: #b5813a; }
  .cat-btn.active { background: #b5813a; border-color: #b5813a; color: #fff; }

  .add-btn {
    background: #1a1208;
    color: #faf8f4;
    border: none;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 10px 24px;
    border-radius: 30px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .add-btn:hover { background: #b5813a; }

  .search-bar-wrap {
    margin-bottom: 32px;
    position: relative;
  }
  .search-bar-wrap input {
    width: 100%;
    background: #fff;
    border: 1.5px solid #e8e0d0;
    border-radius: 30px;
    padding: 12px 20px 12px 46px;
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    color: #1a1208;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .search-bar-wrap input:focus {
    border-color: #b5813a;
    box-shadow: 0 0 0 3px rgba(181,129,58,0.1);
  }
  .search-bar-wrap input::placeholder { color: #b5a88a; }
  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 17px;
    pointer-events: none;
  }
  .search-clear {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 18px;
    color: #9a8a70;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
    transition: color 0.2s;
  }
  .search-clear:hover { color: #1a1208; }
  .search-results-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #b5813a;
    margin-bottom: 20px;
    margin-top: -12px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 28px;
  }
  .card {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.25s, box-shadow 0.25s;
    box-shadow: 0 2px 12px rgba(26,18,8,0.07);
  }
  .card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(26,18,8,0.13); }
  .card-img { width: 100%; height: 200px; object-fit: cover; display: block; }
  .card-img-placeholder {
    width: 100%; height: 200px;
    background: linear-gradient(135deg, #f0e8d8 0%, #e8dcc8 100%);
    display: flex; align-items: center; justify-content: center; font-size: 52px;
  }
  .card-body { padding: 20px 22px 24px; }
  .card-category { font-size: 10px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #b5813a; margin-bottom: 8px; }
  .card-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #1a1208; margin-bottom: 8px; line-height: 1.25; }
  .card-desc { font-size: 14px; color: #7a6a50; line-height: 1.5; font-weight: 300; margin-bottom: 16px; }
  .card-meta { display: flex; gap: 16px; font-size: 12px; color: #9a8a70; font-weight: 700; letter-spacing: 0.5px; }
  .card-ingredient-match {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #b5813a;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #f0e8d8;
  }

  .detail { animation: fadeIn 0.3s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  .detail-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 36px;
  }
  .detail-actions { display: flex; gap: 10px; }

  .back-btn {
    background: none; border: none;
    font-family: 'Lato', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: #b5813a; cursor: pointer; padding: 0;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .back-btn:hover { color: #1a1208; }

  .edit-btn {
    background: #1a1208; color: #faf8f4; border: none;
    font-family: 'Lato', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    padding: 9px 20px; border-radius: 30px; cursor: pointer; transition: background 0.2s;
  }
  .edit-btn:hover { background: #b5813a; }

  .delete-btn {
    background: none; border: 1.5px solid #e0c8c8; color: #c0605a;
    font-family: 'Lato', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    padding: 9px 20px; border-radius: 30px; cursor: pointer; transition: all 0.2s;
  }
  .delete-btn:hover { background: #c0605a; color: #fff; border-color: #c0605a; }

  .detail-img { width: 100%; height: 400px; object-fit: cover; border-radius: 4px; margin-bottom: 36px; display: block; }
  .detail-img-placeholder {
    width: 100%; height: 300px;
    background: linear-gradient(135deg, #f0e8d8, #e8dcc8);
    border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 80px; margin-bottom: 36px;
  }
  .detail-category { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #b5813a; margin-bottom: 12px; }
  .detail-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 5vw, 52px); font-weight: 700; color: #1a1208; line-height: 1.1; margin-bottom: 16px; }
  .detail-desc { font-size: 17px; color: #7a6a50; font-weight: 300; line-height: 1.6; margin-bottom: 24px; font-style: italic; font-family: 'Playfair Display', serif; }
  .detail-meta {
    display: flex; gap: 24px; padding: 20px 0;
    border-top: 1px solid #e8e0d0; border-bottom: 1px solid #e8e0d0; margin-bottom: 40px;
    font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #9a8a70;
  }
  .detail-meta span b { color: #1a1208; font-size: 20px; display: block; letter-spacing: 0; text-transform: none; font-family: 'Playfair Display', serif; margin-bottom: 2px; }
  .detail-columns { display: grid; grid-template-columns: 1fr 1.6fr; gap: 48px; }
  @media (max-width: 640px) { .detail-columns { grid-template-columns: 1fr; } }
  .detail-section-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #1a1208; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #b5813a; }
  .ingredients-list { list-style: none; }
  .ingredients-list li { padding: 10px 0; border-bottom: 1px solid #f0e8d8; font-size: 15px; color: #3a2e1e; font-weight: 300; display: flex; align-items: center; gap: 10px; }
  .ingredients-list li::before { content: ''; width: 6px; height: 6px; background: #b5813a; border-radius: 50%; flex-shrink: 0; }
  .ingredients-list li.highlight { background: #fdf6ec; margin: 0 -8px; padding: 10px 8px; border-radius: 3px; font-weight: 700; color: #b5813a; }
  .ingredients-list li.ingredients-subheading {
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #b5813a;
    border-bottom: none;
    padding-top: 20px;
    padding-bottom: 4px;
    margin-top: 8px;
  }
  .ingredients-list li.ingredients-subheading::before { display: none; }
  .steps-list { list-style: none; counter-reset: steps; }
  .steps-list li { counter-increment: steps; padding: 0 0 24px 52px; position: relative; font-size: 15px; color: #3a2e1e; line-height: 1.65; font-weight: 300; }
  .steps-list li::before { content: counter(steps); position: absolute; left: 0; top: 0; width: 34px; height: 34px; background: #1a1208; color: #faf8f4; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; }

  .modal-overlay { position: fixed; inset: 0; background: rgba(26,18,8,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; animation: fadeIn 0.2s ease; }
  .modal { background: #faf8f4; border-radius: 4px; width: 100%; max-width: 580px; max-height: 90vh; overflow-y: auto; padding: 40px; animation: slideUp 0.3s ease; }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .modal h2 { font-family: 'Playfair Display', serif; font-size: 28px; color: #1a1208; margin-bottom: 28px; }
  .form-group { margin-bottom: 20px; }
  .form-group label { display: block; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #7a6a50; margin-bottom: 8px; }
  .form-group input, .form-group textarea, .form-group select { width: 100%; background: #fff; border: 1.5px solid #e8e0d0; border-radius: 4px; padding: 12px 14px; font-family: 'Lato', sans-serif; font-size: 15px; color: #1a1208; transition: border-color 0.2s; outline: none; }
  .form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: #b5813a; }
  .form-group textarea { min-height: 80px; resize: vertical; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .img-upload { width: 100%; height: 130px; border: 2px dashed #d4c9b0; border-radius: 4px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: border-color 0.2s, background 0.2s; font-size: 13px; color: #9a8a70; gap: 8px; position: relative; overflow: hidden; }
  .img-upload:hover { border-color: #b5813a; background: #fdf6ec; }
  .img-upload input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
  .img-upload-preview { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
  .modal-actions { display: flex; gap: 12px; margin-top: 28px; }
  .btn-primary { flex: 1; background: #1a1208; color: #faf8f4; border: none; padding: 14px; border-radius: 4px; font-family: 'Lato', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
  .btn-primary:hover { background: #b5813a; }
  .btn-cancel { background: none; border: 1.5px solid #d4c9b0; color: #7a6a50; padding: 14px 24px; border-radius: 4px; font-family: 'Lato', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
  .btn-cancel:hover { border-color: #1a1208; color: #1a1208; }

  .confirm-modal { background: #faf8f4; border-radius: 4px; width: 100%; max-width: 400px; padding: 40px; text-align: center; animation: slideUp 0.3s ease; }
  .confirm-modal h3 { font-family: 'Playfair Display', serif; font-size: 22px; color: #1a1208; margin-bottom: 12px; }
  .confirm-modal p { font-size: 15px; color: #7a6a50; margin-bottom: 28px; font-weight: 300; line-height: 1.5; }
  .btn-delete-confirm { flex: 1; background: #c0605a; color: #fff; border: none; padding: 14px; border-radius: 4px; font-family: 'Lato', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
  .btn-delete-confirm:hover { background: #a04848; }

  .empty { text-align: center; padding: 80px 20px; font-family: 'Playfair Display', serif; font-size: 20px; color: #b5a88a; font-style: italic; }

  .saving-indicator { position: fixed; bottom: 20px; right: 20px; background: #1a1208; color: #faf8f4; padding: 10px 20px; border-radius: 30px; font-size: 12px; font-weight: 700; letter-spacing: 1px; opacity: 0; transition: opacity 0.3s; pointer-events: none; }
  .saving-indicator.visible { opacity: 1; }

  .ingredients-hint { font-size: 12px; color: #9a8a70; margin-top: 6px; font-style: italic; }
`;

const categoryEmoji = { Italian: "🍝", Asian: "🥢", Mexican: "🌮", Sides: "🥗", Dessert: "🍰", default: "🍴" };
const emptyForm = { title: "", category: "Italian", time: "", serves: "", description: "", ingredients: "", steps: "", image: null };

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetch("http://localhost:3001/api/recipes")
      .then(res => res.json())
      .then(data => {
        setRecipes(data.length > 0 ? data : initialRecipes);
        setLoading(false);
      })
      .catch(() => {
        setRecipes(initialRecipes);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading) return;
    setSaving(true);
    fetch("http://localhost:3001/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipes)
    })
      .then(() => { setTimeout(() => setSaving(false), 1000); })
      .catch(() => setSaving(false));
  }, [recipes, loading]);

  const searchTrimmed = searchQuery.trim().toLowerCase();
  const categoryFiltered = activeCategory === "All" ? recipes : recipes.filter(r => r.category === activeCategory);
  const filtered = searchTrimmed
    ? categoryFiltered.filter(r => r.ingredients.some(ing => ing.toLowerCase().includes(searchTrimmed)))
    : categoryFiltered;

  const getMatchedIngredients = (recipe) => {
    if (!searchTrimmed) return [];
    return recipe.ingredients.filter(ing => ing.toLowerCase().includes(searchTrimmed));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm(f => ({ ...f, image: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const openEdit = (recipe) => {
    setForm({
      title: recipe.title,
      category: recipe.category,
      time: recipe.time === "—" ? "" : recipe.time,
      serves: String(recipe.serves === "—" ? "" : recipe.serves),
      description: recipe.description || "",
      ingredients: recipe.ingredients.join("\n"),
      steps: recipe.steps.join("\n"),
      image: recipe.image
    });
    setEditingRecipe(recipe);
    setSelected(null);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    const updatedRecipe = {
      id: editingRecipe ? editingRecipe.id : Date.now(),
      title: form.title,
      category: form.category,
      image: form.image,
      time: form.time || "—",
      serves: parseInt(form.serves) || "—",
      description: form.description,
      ingredients: form.ingredients.split("\n").filter(Boolean),
      steps: form.steps.split("\n").filter(Boolean)
    };
    setRecipes(prev =>
      editingRecipe
        ? prev.map(r => r.id === editingRecipe.id ? updatedRecipe : r)
        : [updatedRecipe, ...prev]
    );
    setForm(emptyForm);
    setEditingRecipe(null);
    setShowForm(false);
  };

  const handleDelete = (recipe) => {
    setRecipes(prev => prev.filter(r => r.id !== recipe.id));
    setConfirmDelete(null);
    setSelected(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingRecipe(null);
    setForm(emptyForm);
  };

  if (loading) return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="empty">Loading your recipes...</div>
      </div>
    </>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className={`saving-indicator${saving ? " visible" : ""}`}>Saving...</div>

        <header className="header">
          <div className="header-label">Home Cookbook</div>
          <h1>My Recipes</h1>
          <p>A personal collection of favourite dishes</p>
        </header>

        {selected ? (
          <div className="detail">
            <div className="detail-toolbar">
              <button className="back-btn" onClick={() => setSelected(null)}>← Back to recipes</button>
              <div className="detail-actions">
                <button className="edit-btn" onClick={() => openEdit(selected)}>✏ Edit</button>
                <button className="delete-btn" onClick={() => setConfirmDelete(selected)}>✕ Delete</button>
              </div>
            </div>
            {selected.image
              ? <img src={selected.image} alt={selected.title} className="detail-img" />
              : <div className="detail-img-placeholder">{categoryEmoji[selected.category] || categoryEmoji.default}</div>
            }
            <div className="detail-category">{selected.category}</div>
            <h2 className="detail-title">{selected.title}</h2>
            {selected.description && <p className="detail-desc">{selected.description}</p>}
            <div className="detail-meta">
              <div><span><b>{selected.time}</b>Cook Time</span></div>
              <div><span><b>{selected.serves}</b>Servings</span></div>
              <div><span><b>{selected.ingredients.filter(i => !i.startsWith("#")).length}</b>Ingredients</span></div>
            </div>
            <div className="detail-columns">
              <div>
                <div className="detail-section-title">Ingredients</div>
                <ul className="ingredients-list">
                  {selected.ingredients.map((ing, i) =>
                    ing.startsWith("#") ? (
                      <li key={i} className="ingredients-subheading">
                        {ing.replace("#", "").trim()}
                      </li>
                    ) : (
                      <li key={i} className={searchTrimmed && ing.toLowerCase().includes(searchTrimmed) ? "highlight" : ""}>
                        {ing}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <div className="detail-section-title">Method</div>
                <ol className="steps-list">
                  {selected.steps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="toolbar">
              <div className="categories">
                {CATEGORIES.map(cat => (
                  <button key={cat} className={`cat-btn${activeCategory === cat ? " active" : ""}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
                ))}
              </div>
              <button className="add-btn" onClick={() => setShowForm(true)}>+ Add Recipe</button>
            </div>

            <div className="search-bar-wrap">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by ingredient (e.g. garlic, chicken, lime...)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery("")}>✕</button>
              )}
            </div>

            {searchTrimmed && (
              <div className="search-results-label">
                {filtered.length === 0
                  ? `No recipes found containing "${searchTrimmed}"`
                  : `${filtered.length} recipe${filtered.length > 1 ? "s" : ""} containing "${searchTrimmed}"`
                }
              </div>
            )}

            {filtered.length === 0
              ? <div className="empty">No {activeCategory} recipes yet — add one!</div>
              : (
                <div className="grid">
                  {filtered.map(recipe => {
                    const matched = getMatchedIngredients(recipe);
                    return (
                      <div key={recipe.id} className="card" onClick={() => setSelected(recipe)}>
                        {recipe.image
                          ? <img src={recipe.image} alt={recipe.title} className="card-img" />
                          : <div className="card-img-placeholder">{categoryEmoji[recipe.category] || categoryEmoji.default}</div>
                        }
                        <div className="card-body">
                          <div className="card-category">{recipe.category}</div>
                          <div className="card-title">{recipe.title}</div>
                          {recipe.description && <div className="card-desc">{recipe.description}</div>}
                          <div className="card-meta">
                            <span>⏱ {recipe.time}</span>
                            <span>👥 Serves {recipe.serves}</span>
                          </div>
                          {matched.length > 0 && (
                            <div className="card-ingredient-match">
                              ✓ Contains: {matched.join(", ")}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            }
          </>
        )}

        {showForm && (
          <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && handleCloseForm()}>
            <div className="modal">
              <h2>{editingRecipe ? "Edit Recipe" : "New Recipe"}</h2>
              <div className="form-group">
                <label>Photo</label>
                <div className="img-upload">
                  {form.image
                    ? <img src={form.image} alt="preview" className="img-upload-preview" />
                    : <><span style={{fontSize: 28}}>📷</span><span>Click to upload a photo</span></>
                  }
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>
              <div className="form-group">
                <label>Recipe Name</label>
                <input placeholder="e.g. Chicken Tikka Masala" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}>
                    <option>Italian</option>
                    <option>Asian</option>
                    <option>Mexican</option>
                    <option>Sides</option>
                    <option>Dessert</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Cook Time</label>
                  <input placeholder="e.g. 30 mins" value={form.time} onChange={e => setForm(f => ({...f, time: e.target.value}))} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Servings</label>
                  <input type="number" placeholder="e.g. 4" value={form.serves} onChange={e => setForm(f => ({...f, serves: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label>Short Description</label>
                  <input placeholder="One line about the dish" value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
                </div>
              </div>
              <div className="form-group">
                <label>Ingredients (one per line)</label>
                <textarea
                  placeholder={"500g pasta\n2 garlic cloves\n# For the sauce\n400g tinned tomatoes\n..."}
                  value={form.ingredients}
                  onChange={e => setForm(f => ({...f, ingredients: e.target.value}))}
                />
                <p className="ingredients-hint">Tip: start a line with # to create a section heading e.g. # For the sauce</p>
              </div>
              <div className="form-group">
                <label>Steps (one per line)</label>
                <textarea placeholder={"Boil the pasta\nMake the sauce\n..."} value={form.steps} onChange={e => setForm(f => ({...f, steps: e.target.value}))} style={{minHeight: 100}} />
              </div>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={handleCloseForm}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit}>
                  {editingRecipe ? "Save Changes" : "Save Recipe"}
                </button>
              </div>
            </div>
          </div>
        )}

        {confirmDelete && (
          <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setConfirmDelete(null)}>
            <div className="confirm-modal">
              <h3>Delete Recipe?</h3>
              <p>Are you sure you want to delete <strong>{confirmDelete.title}</strong>? This can't be undone.</p>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setConfirmDelete(null)}>Cancel</button>
                <button className="btn-delete-confirm" onClick={() => handleDelete(confirmDelete)}>Delete</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}