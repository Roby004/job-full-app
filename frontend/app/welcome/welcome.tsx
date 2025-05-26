import { useMemo, useState } from 'react';
import { NavbarGen } from '~/components/navbar-gen';
import { Link } from 'react-router';
import bg from "../images/bg3.png";

/* ******** Afaka alana fa données statiques ireto ******** */
const jobsTest = [
  {
    id: 1,
    title: 'Développeur React',
    description: 'Appli front-end en React.',
    company: 'TechCorp',
    category: 'Développement Web',
    location: 'Freelance',
    budget: 400,
    experience: 'Intermédiaire',
    postedAt: '1min',
  },
  {
    id: 2,
    title: 'Designer UI/UX',
    description: 'Conception d’une UI mobile.',
    company: 'Designify',
    category: 'Design',
    location: 'Sur site',
    budget: 200,
    experience: 'Débutant',
    postedAt: '2j',
  },
  {
    id: 3,
    title: 'Rédacteur SEO',
    description: 'Contenu optimisé pour moteurs de recherche.',
    company: 'ContentLab',
    category: 'Marketing',
    location: 'Freelance',
    budget: 150,
    experience: 'Débutant',
    postedAt: '3j',
  },
  {
    id: 4,
    title: 'DevOps',
    description: 'CI/CD, monitoring et cloud infrastructure.',
    company: 'InfraPro',
    category: 'Développement Web',
    location: 'Sur site',
    budget: 850,
    experience: 'Expert',
    postedAt: '1 mois',
  },
  {
    id: 5,
    title: 'Développeur Full Stack',
    description: 'Node.js + React',
    company: 'WebGen',
    category: 'Développement Web',
    location: 'Freelance',
    budget: 600,
    experience: 'Intermédiaire',
    postedAt: '3j',
  },
];

export function Welcome() {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [experiences, setExperiences] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recent');

  // Filtrer des expériences
  const toggleExperience = (level: string) => {
    setExperiences((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  // Filtrage des données
  const filteredJobs = useMemo(() => {
    let data = [...jobsTest];

    
    if (category) data = data.filter((job) => job.category === category);
    if (location) data = data.filter((job) => job.location === location);
    if (budgetMin) data = data.filter((job) => job.budget >= Number(budgetMin));
    if (budgetMax) data = data.filter((job) => job.budget <= Number(budgetMax));
    if (experiences.length)
      data = data.filter((job) => experiences.includes(job.experience));

    // Apply sorting
    if (sortBy === 'budgetAsc') data.sort((a, b) => a.budget - b.budget);
    if (sortBy === 'budgetDesc') data.sort((a, b) => b.budget - a.budget);

    return data;
  }, [category, location, budgetMin, budgetMax, experiences, sortBy]);

  return (
    <main className="flex flex-col items-center pt-2 pb-4 bg-gray-100 font-sans">
      <NavbarGen />

      {/* Welcome Panel */}
<div
  className=" bg-cover bg-center  py-10 px-6 rounded-md mb-6"
  style={{
    backgroundImage: `url(${bg})`, // Change path as needed
    minHeight: '200px',
    width: '90%',
  }}
>
  <div className="max-w-7xl mx-auto text-center ">
    <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg text-white">
      Bienvenue sur <span className="text-yellow-300">E-tady</span>
    </h1>
    <p className="text-lg md:text-xl text-gray-100 text-black drop-shadow-lg">
      Connecter les talents et les opportunités en un seul clic.
    </p>
  </div>
</div>

      <div className="flex w-full px-8 py-6 gap-6 max-w-7xl">
        {/* Filters */}
        <aside className="w-1/4 bg-white rounded-md shadow-md p-5">
          <h2 className="text-xl font-semibold mb-4">Filtres</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Catégorie</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Toutes</option>
              <option>Développement Web</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Localisation</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Toutes</option>
              <option>Freelance</option>
              <option>Sur site</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Budget (€)</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 border rounded px-2 py-1"
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 border rounded px-2 py-1"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Niveau d'expérience</label>
            <div className="space-y-1 text-sm">
              {['Débutant', 'Intermédiaire', 'Expert'].map((level) => (
                <label key={level} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={experiences.includes(level)}
                    onChange={() => toggleExperience(level)}
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Job List */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Offres d'emploi</h2>
            <div>
              <label className="text-sm mr-2">Trier par:</label>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Plus récent</option>
                <option value="budgetAsc">Budget croissant</option>
                <option value="budgetDesc">Budget décroissant</option>
              </select>
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <p className="text-gray-500">Aucune offre ne correspond aux filtres sélectionnés.</p>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-5 mb-4 rounded-md shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      <strong>Entreprise:</strong> {job.company} | <strong>Budget:</strong> €{job.budget} |{' '}
                      <strong>Expérience:</strong> {job.experience}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Posté il y a {job.postedAt}</div>
                  </div>
                  <Link
                    to={`employe/jobDetail/${job.id}`}
                    className="mt-1 px-4 py-2 text-sm  text-white rounded hover:bg-yellow-700" style={{ backgroundColor: '#0a8051' }}
                  >
                    Voir détail
                  </Link>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

const resources = [
  {
    href: "https://reactrouter.com/docs",
    text: "React Router Docs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "https://rmx.as/discord",
    text: "Join Discord",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];
