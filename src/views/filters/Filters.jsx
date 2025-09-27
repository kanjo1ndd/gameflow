import './Filters.css'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Filter() {
    const filters = [
        {
            title: "Жанр",
            options: ["Action", "Adventure", "RPG", "Strategy"],
        },
        {
            title: "Ціна",
            options: ["Бескоштовно", "До 100 гривень", "До 300 гривень", "До 600 гривень", "До 900 гривень", "Без обмежень"],
        },
        {
            title: "Тип",
            options: ["???", "???"],
        },
        {
            title: "Особливості",
            options: ["???", "???"],
        },
        {
            title: "Платформа",
            options: ["PC", "PlayStation", "Xbox", "Switch"],
        },
        {
            title: "Івенти",
            options: ["???", "???"],
        },
    ];

    const [openFilters, setOpenFilters] = useState(
        filters.reduce((acc, f) => ({ ...acc, [f.title]: false }), {})
    );

    const toggleFilter = (title) => {
        setOpenFilters((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    const [searchText, setSearchText] = useState("");

    return <>
        <div className='filter-block'>
            <div className='filter-text'>Фільтри <div className='text-reset'>Скинути</div></div>
            <div className='block-search-tags'>
                <input className='search-tags' placeholder='Пошук тегів' value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} />
                <i class="bi bi-x-lg" onClick={() => setSearchText("")} />
            </div>
            {filters.map((filter) => (
                <div className="filter-genre" key={filter.title}>
                    <div className="genre-header">
                        {filter.title}{" "}
                        <i
                        className={`bi ${openFilters[filter.title] ? "bi-chevron-up" : "bi-chevron-down"}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleFilter(filter.title)}
                        />
                    </div>

                    <AnimatePresence>
                        {openFilters[filter.title] && (
                        <motion.div
                            className="genre-list"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ul>
                            {filter.options.map((option) => (
                                <label className="checkbox" key={option}>
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                {option}
                                </label>
                            ))}
                            </ul>
                        </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    </>;
}

export function Sorting() {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return <>
        <div className='sorting-block'>
            <div className='sorting-text'> Сортування:
                <div>

                </div>
            </div>
            <div className='sorting-text'> Вид:
                <div>

                </div>
            </div>
        </div>
    </>;
}