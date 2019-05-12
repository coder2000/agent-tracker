import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTicketAlt,
  faChartBar,
  faLevelUpAlt,
  faDollarSign,
  faQuestion,
  faHandshake
} from "@fortawesome/free-solid-svg-icons";

import { faAirbnb } from "@fortawesome/free-brands-svg-icons";

export default function loadIcons() {
  library.add(
    faTicketAlt,
    faChartBar,
    faLevelUpAlt,
    faDollarSign,
    faQuestion,
    faHandshake,
    faAirbnb
  );
}
