import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export default function EmployeeCalendar({ absences = [] }) {
    // Define color mapping for different absence types
    const getAbsenceColors = (type, justified) => {
        // Default colors if type is not specified
        let bgColor = "#ef4444"; // red-500
        let borderColor = "#dc2626"; // red-600

        // Check if the absence is justified
        const isJustified = justified && justified.toLowerCase() === "oui";

        // Set colors based on type
        switch (type?.toLowerCase()) {
            case "maladie":
                bgColor = "#facc15"; // yellow-400
                borderColor = "#eab308"; // yellow-500
                break;
            case "congé":
                bgColor = "#22c55e"; // green-500
                borderColor = "#16a34a"; // green-600
                break;
            default:
                break;
        }

        return { bgColor, borderColor };
    };

    // Transform the absence data for FullCalendar
    const events = absences.map((absence) => {
        const { bgColor, borderColor } = getAbsenceColors(
            absence.type,
            absence.justificatif
        );

        return {
            title: absence.type || "Absence",
            start: absence.date_absence,
            backgroundColor: bgColor,
            borderColor: borderColor,
            allDay: true,
            extendedProps: {
                justificatif: absence.justificatif,
                commentaire: absence.commentaire_justificatif,
                type: absence.type,
            },
        };
    });

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-medium mb-4">
                Calendrier des Absences
            </h2>

            {/* Color legend */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
                <div className="flex items-center">
                    <span className="w-4 h-4 mr-2 rounded-full bg-red-500"></span>
                    <span className="text-sm">Non justifiée</span>
                </div>
                <div className="flex items-center">
                    <span className="w-4 h-4 mr-2 rounded-full bg-yellow-400"></span>
                    <span className="text-sm">Maladie</span>
                </div>
                <div className="flex items-center">
                    <span className="w-4 h-4 mr-2 rounded-full bg-green-500"></span>
                    <span className="text-sm">Congé</span>
                </div>
            </div>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek",
                }}
                events={events} // Use the transformed events array
                locale="fr" // Set to French
                height="auto"
                firstDay={1} // Start week on Monday
                buttonText={{
                    today: "Aujourd'hui",
                    month: "Mois",
                    week: "Semaine",
                }}
                eventDidMount={(info) => {
                    // Add a tooltip with additional information
                    const type = info.event.extendedProps.type || "Absence";
                    const justificatif =
                        info.event.extendedProps.justificatif === "oui"
                            ? "Oui"
                            : "Non";
                    const commentaire = info.event.extendedProps.commentaire;

                    const tooltip = document.createElement("div");
                    tooltip.classList.add(
                        "bg-gray-800",
                        "text-white",
                        "p-2",
                        "rounded",
                        "shadow-lg",
                        "text-sm"
                    );
                    tooltip.innerHTML = `
                        <div><strong>Type:</strong> ${type}</div>
                        <div><strong>Justifiée:</strong> ${justificatif}</div>
                        ${
                            commentaire
                                ? `<div><strong>Commentaire:</strong> ${commentaire}</div>`
                                : ""
                        }
                    `;

                    tippy(info.el, {
                        content: tooltip,
                        allowHTML: true,
                    });
                }}
            />
        </div>
    );
}