import React, { useState } from 'react';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import axios from 'axios';

const StepRecrutement = ({ candidat }) => {
  const [stepStatus, setStepStatus] = useState({
    avisEquipe: null,
    mailCandidat: false,
    avisEvaluateurs: null,
    mailEntretien: false,
    decisionFinale: null,
  });

  const [openSteps, setOpenSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });

  const toggleStep = (stepKey) => {
    setOpenSteps((prev) => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const handleSelect = (step, decision) => {
    setStepStatus((prev) => ({ ...prev, [step]: decision }));
    alert(`Décision enregistrée pour ${step} : ${decision}`);
  };

 // Dans la fonction sendEmail
const sendEmail = async (type) => {
 //const selectedOfferId = localStorage.getItem("selectedOfferId");
  const entrepriseName = localStorage.getItem("SelectedOfferCompanyName") || "Anonyme";

  console.log("Selected candidat:", candidat);
  console.log("Entreprise Name:", entrepriseName);

  try {
    const res = await axios.post("http://localhost:5000/send-email", {
      candidat: {
        nom: candidat.nom,
        email: candidat.email,
        entreprise: candidat.entreprise ,
        nom_offre: candidat.nom_offre,
      }
    });

    if (res.data.success) {
      alert("📧 Email envoyé avec succès !");
      setStepStatus((prev) => ({ ...prev, mailCandidat: true }));
    } else {
      alert("Erreur lors de l’envoi de l’email.");
    }
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l’envoi de l’email.");
  }
};



  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-4 text-[#023047]">
      <h2 className="text-lg font-semibold">Étapes du recrutement</h2>

      {/* Étape 1 */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep('step1')}
        >
          <h3 className="font-medium mb-2">1/5 - Avis de l'équipe</h3>
          {openSteps.step1 ? <ArrowDropUp /> : <ArrowDropDown />}
        </div>
        {openSteps.step1 && (
          <div className="flex gap-2">
            <button
              className="px-4 py-2 border border-[#023047] rounded bg-white hover:bg-[#023047]/10"
              onClick={() => handleSelect('avisEquipe', 'selectionné')}
            >
              Sélectionner
            </button>
            <button
              className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
              onClick={() => handleSelect('avisEquipe', 'rejeté')}
            >
              Rejeter
            </button>
          </div>
        )}
      </div>

      {/* Étape 2 */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep('step2')}
        >
          <h3 className="font-medium mb-2">2/5 - Notification au candidat</h3>
          {openSteps.step2 ? <ArrowDropUp /> : <ArrowDropDown />}
        </div>
        {openSteps.step2 && (
          <button
            className="px-4 py-2 bg-[#023047] text-white rounded hover:bg-[#03507f]"
            onClick={() => {
              sendEmail('sélection');
              setStepStatus((prev) => ({ ...prev, mailCandidat: true }));
            }}
          >
            Envoyer l'email de sélection
          </button>
        )}
      </div>

      {/* Étape 3 */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep('step3')}
        >
          <h3 className="font-medium mb-2">3/5 - Avis des évaluateurs</h3>
          {openSteps.step3 ? <ArrowDropUp /> : <ArrowDropDown />}
        </div>
        {openSteps.step3 && (
          <div className="flex gap-2">
            <button
              className="px-4 py-2 border border-[#023047] rounded bg-white hover:bg-[#023047]/10"
              onClick={() => handleSelect('avisEvaluateurs', 'selectionné')}
            >
              Sélectionner
            </button>
            <button
              className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
              onClick={() => handleSelect('avisEvaluateurs', 'rejeté')}
            >
              Rejeter
            </button>
          </div>
        )}
      </div>

      {/* Étape 4 */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep('step4')}
        >
          <h3 className="font-medium mb-2">4/5 - Entretien (optionnel)</h3>
          {openSteps.step4 ? <ArrowDropUp /> : <ArrowDropDown />}
        </div>
        {openSteps.step4 && (
          <button
            className="px-4 py-2 bg-[#023047] text-white rounded hover:bg-[#03507f]"
            onClick={() => {
              sendEmail("invitation à l'entretien");
              setStepStatus((prev) => ({ ...prev, mailEntretien: true }));
            }}
          >
            Envoyer un email pour l'entretien
          </button>
        )}
      </div>

      {/* Étape 5 */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep('step5')}
        >
          <h3 className="font-medium mb-2">5/5 - Recrutement final</h3>
          {openSteps.step5 ? <ArrowDropUp /> : <ArrowDropDown />}
        </div>
        {openSteps.step5 && (
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => {
                sendEmail('confirmation de recrutement');
                setStepStatus((prev) => ({ ...prev, decisionFinale: 'accepté' }));
              }}
            >
              ✅ Accepter
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {
                sendEmail('refus de candidature');
                setStepStatus((prev) => ({ ...prev, decisionFinale: 'refusé' }));
              }}
            >
              ❌ Refuser
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepRecrutement;
