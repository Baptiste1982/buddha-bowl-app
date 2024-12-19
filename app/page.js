'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Importer html2pdf uniquement côté client
const html2pdf = dynamic(() => import('html2pdf.js'), { ssr: false })

export default function BuddhaBowlFiche() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleImageChange = (e) => {
    if (typeof window !== 'undefined' && e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(URL.createObjectURL(file))
    }
  }

  const generatePDF = () => {
    if (typeof window !== 'undefined' && isClient) {
      const element = document.getElementById('buddha-bowl-fiche')
      const opt = {
        margin:       1,
        filename:     'buddha-bowl-fiche.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      }

      html2pdf().set(opt).from(element).save()
    }
  }

  return (
    <div className="relative">
      <button
        onClick={generatePDF}
        className="fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586L7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
        </svg>
        Télécharger PDF
      </button>

      <div id="buddha-bowl-fiche" className="max-w-5xl mx-auto p-6 bg-emerald-50">
        <div className="flex justify-between items-start gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold border-b-2 border-emerald-600 pb-2 text-emerald-800">
              BUDDHA BOWL SIGNATURE
            </h1>
            <h2 className="text-xl text-orange-600 mt-2 italic">
              "L'Harmonie des Saveurs"
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg border-l-4 border-l-emerald-500 shadow-sm">
                <span className="font-bold text-emerald-700">CATÉGORIE:</span> <span className="text-gray-800">Healthy Food</span>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-l-emerald-500 shadow-sm">
                <span className="font-bold text-emerald-700">COÛT MATIÈRE:</span> <span className="text-gray-800">53 MAD/portion</span>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-l-emerald-500 shadow-sm">
                <span className="font-bold text-emerald-700">PRIX DE VENTE:</span> <span className="text-gray-800">186 MAD</span>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-l-emerald-500 shadow-sm">
                <span className="font-bold text-emerald-700">MARGE BRUTE:</span> <span className="text-gray-800">71%</span>
              </div>
            </div>
          </div>
          
          <div className="w-64 h-64 flex-shrink-0 relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-emerald-300 rounded-lg bg-white">
              <div className="text-emerald-600 mb-2">Cliquez pour ajouter l'image</div>
              <button className="px-4 py-2 border border-emerald-500 text-emerald-700 rounded hover:bg-emerald-50">
                Choisir une image
              </button>
            </div>
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Buddha Bowl"
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>

        {/* Le reste de votre code reste exactement le même */}
        <div className="space-y-6">
          {/* Votre section de temps de réalisation */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-emerald-800">TEMPS DE RÉALISATION</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-4 rounded-lg text-gray-800">
                Préparation: 25 min
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg text-gray-800">
                Cuisson: 30 min
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg text-gray-800">
                Total: 55 min
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg text-gray-800">
                Difficulté: ★★☆☆☆
              </div>
            </div>
          </section>

          {/* Votre section process de fabrication */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-emerald-800">PROCESS DE FABRICATION</h3>
            
            <div className="space-y-4">
              {/* Votre code existant pour les étapes */}
              {[
                {
                  title: "1. QUINOA",
                  steps: ["Rincer abondamment", "Cuire 15 min eau bouillante", "Refroidir en cellule"],
                  points: ["T° cuisson 98°C", "Égouttage parfait", "T° finale 3°C"]
                },
                {
                  title: "2. PATATES DOUCES",
                  steps: ["Laver, éplucher, tailler", "Assaisonner huile + épices", "Rôtir 25 min"],
                  points: ["Calibrage 2cm", "Four 200°C", "Coloration +++", "Texture fondante"]
                },
                {
                  title: "3. PRÉPARATION GARNITURES",
                  steps: ["Pois chiches: rincer, sécher", "Carottes: râper fin", "Avocat: trancher", "Épinards: trier, laver"],
                  points: ["Séchage crucial", "Julienne régulière", "Tranches 3mm", "T° stockage 3°C"]
                },
                {
                  title: "4. SAUCE SIGNATURE",
                  steps: ["Mixer tous ingrédients"],
                  points: ["Texture soyeuse", "Équilibre acide/gras"]
                }
              ].map((step, index) => (
                <div key={index} className="border-l-4 border-l-orange-400 bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-orange-800">{step.title}</h4>
                  <div className="space-y-1 text-gray-800">
                    {step.steps.map((s, i) => (
                      <p key={i}>• {s}</p>
                    ))}
                  </div>
                  <div className="mt-3 text-gray-800 bg-orange-100 p-3 rounded">
                    <p className="font-medium">Points clés:</p>
                    {step.points.map((point, i) => (
                      <p key={i}>- {point}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Votre section contrôle qualité */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-emerald-800">CONTRÔLE QUALITÉ</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-4 rounded-lg text-gray-800">
                T° stockage: 3°C ±1°C
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg text-gray-800">
                T° service: 8-10°C
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg text-gray-800">
                DLC: J+2
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg text-gray-800">
                Conservation: J+2
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}