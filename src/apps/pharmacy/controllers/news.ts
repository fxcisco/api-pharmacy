import { __prod__ } from '@/config';
import { asyncHandler } from '@/common';


const articles = [
  {
    title: "CDC Puts Hold On The Johnson & Johnson Vaccine",
    description: "Johnson & Johnson/Janssen vaccine has been linked to rare but serious incidents of blood clotting.",
    image: "https://img1.thelist.com/img/gallery/why-the-cdc-just-put-a-hold-on-the-johnson-johnson-vaccine/intro-1618329864.jpg",
    image_attr: "Michael M. Santiago/Getty Images",
    info_links: [
      "https://www.healthdigest.com/356619/side-effects-of-the-johnson-johnson-covid-19-vaccine-explained"
    ]
  },
  {
    title: "California Allows Vaccinations for Everyone Age 16 and Up",
    description: "'I don’t care where you get it. I just want you to get it,' Gov. Gavin Newsom said of the vaccine",
    image: "https://s.hdnux.com/photos/01/17/44/06/20857255/6/1200x0.jpg",
    image_attr: "Pat Mazzera/ SOPA Images via Getty Images",
    info_links: [
      "https://www.nbcbayarea.com/news/california/california-allows-vaccinations-for-everyone-age-16-and-up/2519954"
    ]
  },
  {
    title: "CVS Health To Offer No-Cost COVID-19 Vaccines In Four More US States",
    description: "No-cost COVID-19 vaccines now offered in 4 more states.",
    image: "https://cvshealth.com/sites/default/files/cvs-health-statement-on-covid-19-vaccine-supply-1-16x9.jpg",
    image_attr: "cvshealth.com",
    info_links: [
      "https://www.cvs.com/immunizations/covid-19-vaccine"
    ]
  },
]



// @desc      Query for a drug
export const recentNews = [
  asyncHandler(async (req, res, next) => {
    try {
      res.json({ news: articles });
    } catch (error) {
      next(error);
    }
  }),
];
