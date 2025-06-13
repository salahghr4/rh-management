import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth }) {
  return (
    <>
      <Head title="TechCorp RH Management" />
      <div className="min-h-screen flex">
        {/* Left content area */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <div className="mb-12 mx-auto">
            <ApplicationLogo className="w-[300px] fill-current text-gray-500" />
          </div>

          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Plateforme de gestion RH
          </h1>

          <p className="text-gray-600 mb-10">
            Bienvenue sur le portail de gestion des ressources humaines de
            TechCorp Solutions. Connectez-vous pour accéder à vos outils RH.
          </p>

          {auth.user ? (
            <div className="space-y-4">
              <p className="text-blue-500 font-medium">
                Vous êtes déjà connecté.
              </p>
              <Link
                href={route("login")}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600 font-medium rounded-lg text-sm transition duration-300 shadow-sm w-auto max-w-xs"
              >
                Accéder au tableau de bord
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 justify-center items-center">
              <Link
                href={route("login")}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600 font-medium rounded-lg text-sm transition duration-300 shadow-sm w-auto max-w-xs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Connexion à votre compte
              </Link>
              <div className="text-center text-sm text-gray-500">
                Si vous n'avez pas de compte ou rencontrez des difficultés,
                veuillez contacter le département IT.
              </div>
            </div>
          )}

          <div className="mt-16">
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              Fonctionnalités principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center text-blue-500 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="font-medium">Gestion des employés</span>
                </div>
                <p className="text-sm text-gray-600">
                  Consultez et gérez les dossiers du personnel
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center text-blue-500 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">Absences</span>
                </div>
                <p className="text-sm text-gray-600">
                  Suivez les absences et les congés
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center text-blue-500 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="font-medium">Documents</span>
                </div>
                <p className="text-sm text-gray-600">
                  Accédez aux formulaires et documents RH
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center text-blue-500 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">Paie</span>
                </div>
                <p className="text-sm text-gray-600">
                  Consultez vos bulletins de salaire
                </p>
              </div>
            </div>
          </div>

          <footer className="mt-12 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TechCorp Solutions. Tous droits
            réservés.
          </footer>
        </div>

        {/* Right decorative area with innovative design */}
        <div className="hidden md:block md:w-1/2 bg-blue-500 relative overflow-hidden">
          {/* Abstract data visualization elements */}
          <div className="absolute inset-0">
            {/* Abstract network lines */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 800"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2">
                <path
                  d="M769,229L1037,260.9M927,880L731,737.6M520,660.6L603,459.9M330,600.8L312,371.4M295,214.3L426.9,286.9M397,808.2L497.8,525.8M652,790.7L712.4,661.9M100,100L100,100"
                  strokeDasharray="5,5"
                />
                <path
                  d="M-65,40.9L200.3,200M29.9,190.9L349.7,250M69.7,281.2L400.3,302.3M316.4,170.3L460.5,300.8M347.1,459.5L532.3,460.4M90.1,500.6L380.4,570.3M689.8,469.5L681.9,268.9M750.3,300.9L655.9,550.3M520.3,420.6L551.8,730.3M530.5,619.7L560.1,489.9M330.1,733.5L330.1,553.4M107.7,550.6L168.6,679L96.9,683.5L200,550"
                  strokeDasharray="3,3"
                />
              </g>
              <g fill="rgba(255,255,255,0.4)">
                <circle cx="769" cy="229" r="5" />
                <circle cx="539" cy="269" r="7" />
                <circle cx="603" cy="493" r="4" />
                <circle cx="731" cy="737" r="5" />
                <circle cx="520" cy="660" r="5" />
                <circle cx="309" cy="538" r="8" />
                <circle cx="295" cy="764" r="3" />
                <circle cx="40" cy="599" r="5" />
                <circle cx="320" cy="280" r="7" />
                <circle cx="295" cy="214" r="4" />
              </g>
            </svg>
          </div>

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-80"></div>

          {/* Centered content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-12">
            <div className="flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-white/10 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Gestion RH Simplifiée
            </h2>

            <div className="max-w-md">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="text-4xl font-bold text-white mb-1">150+</div>
                  <div className="text-blue-100 text-sm">Employés</div>
                </div>
                <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="text-4xl font-bold text-white mb-1">15+</div>
                  <div className="text-blue-100 text-sm">Départements</div>
                </div>
              </div>
            </div>

            <div className="text-white text-opacity-80 text-center text-sm max-w-md">
              Une plateforme unifiée pour toutes vos opérations RH chez TechCorp
              Solutions
            </div>
          </div>

          {/* Bottom decorative waves */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full"
            >
              <path
                fill="rgba(255,255,255,0.1)"
                fillOpacity="1"
                d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,218.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
