import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCircle, Mail, CalendarDays, ShieldCheck } from 'lucide-react';

function Profile() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="pt-32 pb-20 px-6 text-center">
        <p className="text-xl text-gray-600">Devi effettuare l'accesso per visualizzare questa pagina.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-8 mb-10">
            <UserCircle className="w-24 h-24 md:w-32 md:h-32 text-gray-500" strokeWidth={1} />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text text-center md:text-left">
                Il Tuo Profilo
              </h1>
              <p className="text-gray-600 mt-2 text-center md:text-left">
                Benvenuto, {currentUser.displayName || currentUser.email}!
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-6 h-6 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-700">{currentUser.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <CalendarDays className="w-6 h-6 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Membro dal</p>
                <p className="font-medium text-gray-700">
                  {currentUser.metadata.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/D'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Stato Email</p>
                <p className={`font-medium ${currentUser.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
                  {currentUser.emailVerified ? 'Verificata' : 'Non Verificata'}
                </p>
              </div>
            </div>
          </div>

          {/* Ulteriori sezioni del profilo possono essere aggiunte qui */}
          {/* Esempio: Modifica password, Impostazioni account, etc. */}
          <div className="mt-10 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Impostazioni Account</h2>
            <p className="text-gray-500">Funzionalità di gestione account in arrivo...</p>
            {/* <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Modifica Password</button> */}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;