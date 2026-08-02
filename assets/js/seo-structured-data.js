(function () {
   'use strict';

   var BASE_URL = 'https://fillvisa.com';
   var ORG_ID = BASE_URL + '/#organization';
   var WEBSITE_ID = BASE_URL + '/#website';

   var commonFeatureList = [
      'Browser-based form filling',
      'Local-only data storage',
      'Auto-save while completing forms',
      'Ready-to-download PDF generation'
   ];

   var pages = {
      'https://fillvisa.com/': {
         kind: 'home',
         name: 'Fill USCIS Forms Instantly - Free, Private, and 100% Online',
         description: 'Fillvisa helps people complete U.S. immigration forms in the browser with local-only storage, no uploads, no signups, and ready-to-download PDFs.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/']
         ]
      },
      'https://fillvisa.com/form': {
         kind: 'collection',
         name: 'Free Online Form Filler for USCIS Applications',
         description: 'Browse Fillvisa tools for completing USCIS and visa forms online, including DS-160, I-90, I-140, I-485, I-765, N-400, AR-11, and G-1145.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form']
         ]
      },
      'https://fillvisa.com/form/green-card': {
         kind: 'collection',
         name: 'Green Card USCIS Form Fillers',
         description: 'Free browser-based form fillers for green card related USCIS forms, including renewal, adjustment of status, and related immigration paperwork.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form'],
            ['Green Card Forms', 'https://fillvisa.com/form/green-card']
         ]
      },
      'https://fillvisa.com/form/travel-visa': {
         kind: 'collection',
         name: 'Travel and Visa Form Fillers',
         description: 'Free online tools for completing travel and visa forms, including DS-160 and other browser-based visa form workflows.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form'],
            ['Travel and Visa Forms', 'https://fillvisa.com/form/travel-visa']
         ]
      },
      'https://fillvisa.com/form/adoption': {
         kind: 'collection',
         name: 'Adoption-Based USCIS Form Fillers',
         description: 'Free online form filler pages for adoption-based immigration and USCIS form workflows.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form'],
            ['Adoption Forms', 'https://fillvisa.com/form/adoption']
         ]
      },
      'https://fillvisa.com/form/citizenship-naturalization': {
         kind: 'collection',
         name: 'Citizenship and Naturalization Form Fillers',
         description: 'Free browser-based tools for U.S. citizenship and naturalization forms, including Form N-400.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form'],
            ['Citizenship and Naturalization Forms', 'https://fillvisa.com/form/citizenship-naturalization']
         ]
      },
      'https://fillvisa.com/form/web-form': {
         kind: 'collection',
         name: 'Web-Based USCIS Form Fillers',
         description: 'Browser-based Fillvisa form pages for completing immigration forms online without downloads or desktop PDF software.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form'],
            ['Web Forms', 'https://fillvisa.com/form/web-form']
         ]
      },
      'https://fillvisa.com/form/pdf-form': {
         kind: 'collection',
         name: 'PDF-Based USCIS Form Fillers',
         description: 'Fillvisa tools that help generate ready-to-download USCIS PDFs from easier browser-based form flows.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form'],
            ['PDF Forms', 'https://fillvisa.com/form/pdf-form']
         ]
      },
      'https://fillvisa.com/form/usa-ds160': {
         kind: 'formApp',
         formName: 'DS-160',
         name: 'DS-160 Online Visa Application Form Filler',
         description: 'Fillvisa helps applicants complete DS-160 information in a browser-based workflow with auto-save, local-only storage, and automated form filling support.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form'],
            ['DS-160', 'https://fillvisa.com/form/usa-ds160']
         ]
      },
      'https://fillvisa.com/form/i-90': {
         kind: 'formApp',
         formName: 'Form I-90',
         name: 'Form I-90 Online Filler',
         description: 'Fillvisa helps permanent residents complete Form I-90 online, auto-save progress locally, and download a ready-to-review USCIS PDF.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form'],
            ['Form I-90', 'https://fillvisa.com/form/i-90']
         ]
      },
      'https://fillvisa.com/form/i-140': {
         kind: 'formApp',
         formName: 'Form I-140',
         name: 'Form I-140 Online Filler',
         description: 'Fillvisa helps users complete Form I-140 for immigrant worker petitions in a private browser-based workflow and download the completed USCIS PDF.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form'],
            ['Form I-140', 'https://fillvisa.com/form/i-140']
         ]
      },
      'https://fillvisa.com/form/i-485': {
         kind: 'formApp',
         formName: 'Form I-485',
         name: 'Form I-485 Online Filler',
         description: 'Fillvisa helps users complete Form I-485 adjustment of status information online with local-only storage and a ready-to-download USCIS PDF package.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form'],
            ['Form I-485', 'https://fillvisa.com/form/i-485']
         ]
      },
      'https://fillvisa.com/form/i-765': {
         kind: 'formApp',
         formName: 'Form I-765',
         name: 'Form I-765 Online Filler',
         description: 'Fillvisa helps applicants complete Form I-765 work authorization information online and generate a ready-to-review USCIS PDF.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form'],
            ['Form I-765', 'https://fillvisa.com/form/i-765']
         ]
      },
      'https://fillvisa.com/form/n-400': {
         kind: 'formApp',
         formName: 'Form N-400',
         name: 'Form N-400 Online Filler',
         description: 'Fillvisa helps applicants complete Form N-400 naturalization information online, save progress locally, and download a ready-to-review USCIS PDF.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form'],
            ['Form N-400', 'https://fillvisa.com/form/n-400']
         ]
      },
      'https://fillvisa.com/form/ar-11': {
         kind: 'formApp',
         formName: 'Form AR-11',
         name: 'Form AR-11 Online Filler',
         description: 'Fillvisa helps users complete Form AR-11 change of address information online in a browser-based workflow.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form'],
            ['Form AR-11', 'https://fillvisa.com/form/ar-11']
         ]
      },
      'https://fillvisa.com/form/g-1145/': {
         kind: 'formApp',
         formName: 'Form G-1145',
         name: 'Form G-1145 Online Filler',
         description: 'Fillvisa helps users complete Form G-1145 e-notification information online and prepare a ready-to-review PDF.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Forms', 'https://fillvisa.com/form'],
            ['Form G-1145', 'https://fillvisa.com/form/g-1145/']
         ]
      },
      'https://fillvisa.com/services': {
         kind: 'service',
         serviceType: 'Immigration workflow automation',
         name: 'Automation Software for Immigration Workflows',
         description: 'Fillvisa builds white-label client portals, document workflows, form automation, and internal tools for immigration firms and form-heavy teams.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Services', 'https://fillvisa.com/services']
         ]
      },
      'https://fillvisa.com/services/ds-160-automation/': {
         kind: 'service',
         serviceType: 'DS-160 web form automation',
         name: 'DS-160 Web Form Automation Service',
         description: 'Custom DS-160 web form automation for visa agencies and immigration teams, including branded intake, staff review, and source code handoff.',
         offers: [
            ['Starter DS-160 automation build', '800', 'USD']
         ],
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Services', 'https://fillvisa.com/services'],
            ['DS-160 Automation', 'https://fillvisa.com/services/ds-160-automation/']
         ]
      },
      'https://fillvisa.com/services/uscis-form-automation/': {
         kind: 'service',
         serviceType: 'USCIS form automation',
         name: 'USCIS Form Automation Service',
         description: 'Custom USCIS form automation for teams that need reusable case data, smart intake, PDF generation, review flows, and internal operations tooling.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Services', 'https://fillvisa.com/services'],
            ['USCIS Form Automation', 'https://fillvisa.com/services/uscis-form-automation/']
         ]
      },
      'https://fillvisa.com/services/imm-form-automation/': {
         kind: 'service',
         serviceType: 'IMM form automation',
         name: 'IMM Form Automation Service',
         description: 'Custom IMM form automation for immigration teams that need cleaner intake, reusable data, PDF generation, and reviewable workflows.',
         breadcrumbs: [
            ['Home', 'https://fillvisa.com/'],
            ['Services', 'https://fillvisa.com/services'],
            ['IMM Form Automation', 'https://fillvisa.com/services/imm-form-automation/']
         ]
      }
   };

   function getCanonicalUrl() {
      var canonical = document.querySelector('link[rel="canonical"]');
      if (canonical && canonical.href) {
         return canonical.href;
      }

      return window.location.origin + window.location.pathname;
   }

   function getPageData(canonicalUrl) {
      return pages[canonicalUrl] || pages[canonicalUrl.replace(/\/$/, '')] || pages[canonicalUrl + '/'];
   }

   function buildOrganization() {
      return {
         '@type': 'Organization',
         '@id': ORG_ID,
         name: 'Fillvisa',
         url: BASE_URL + '/',
         logo: BASE_URL + '/assets/images/logo/logo.svg',
         description: 'Fillvisa provides browser-based tools and automation software for immigration forms and form-heavy workflows.',
         sameAs: [
            'https://blog.fillvisa.com/',
            'https://help.fillvisa.com/',
            'https://changelog.fillvisa.com/'
         ]
      };
   }

   function buildWebsite() {
      return {
         '@type': 'WebSite',
         '@id': WEBSITE_ID,
         url: BASE_URL + '/',
         name: 'Fillvisa',
         description: 'Free, private, browser-based immigration form tools and custom workflow automation services.',
         publisher: {
            '@id': ORG_ID
         },
         inLanguage: 'en-US'
      };
   }

   function buildWebPage(page, canonicalUrl) {
      var pageType = page.kind === 'collection' ? 'CollectionPage' : 'WebPage';

      return {
         '@type': pageType,
         '@id': canonicalUrl + '#webpage',
         url: canonicalUrl,
         name: page.name,
         description: page.description,
         isPartOf: {
            '@id': WEBSITE_ID
         },
         publisher: {
            '@id': ORG_ID
         },
         inLanguage: 'en-US'
      };
   }

   function buildWebApplication(page, canonicalUrl) {
      return {
         '@type': 'WebApplication',
         '@id': canonicalUrl + '#web-application',
         name: page.formName ? 'Fillvisa ' + page.formName + ' Online Filler' : 'Fillvisa',
         url: canonicalUrl,
         description: page.description,
         applicationCategory: 'BusinessApplication',
         operatingSystem: 'Any',
         browserRequirements: 'Requires a modern web browser.',
         isAccessibleForFree: true,
         featureList: commonFeatureList,
         offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock'
         },
         publisher: {
            '@id': ORG_ID
         }
      };
   }

   function buildService(page, canonicalUrl) {
      var service = {
         '@type': 'Service',
         '@id': canonicalUrl + '#service',
         name: page.name,
         url: canonicalUrl,
         description: page.description,
         serviceType: page.serviceType,
         provider: {
            '@id': ORG_ID
         },
         areaServed: 'Global'
      };

      if (page.offers && page.offers.length) {
         service.offers = page.offers.map(function (offer) {
            return {
               '@type': 'Offer',
               name: offer[0],
               price: offer[1],
               priceCurrency: offer[2],
               availability: 'https://schema.org/InStock'
            };
         });
      }

      return service;
   }

   function buildBreadcrumbList(page, canonicalUrl) {
      var crumbs = page.breadcrumbs || [
         ['Home', BASE_URL + '/'],
         [page.name, canonicalUrl]
      ];

      return {
         '@type': 'BreadcrumbList',
         '@id': canonicalUrl + '#breadcrumb',
         itemListElement: crumbs.map(function (crumb, index) {
            return {
               '@type': 'ListItem',
               position: index + 1,
               name: crumb[0],
               item: crumb[1]
            };
         })
      };
   }

   function cleanText(value) {
      return (value || '').replace(/\s+/g, ' ').trim();
   }

   function getFaqItems() {
      var items = [];
      var seen = {};
      var scopes = document.querySelectorAll('#FAQ, #serviceFaq');

      scopes.forEach(function (scope) {
         var accordion = scope.matches('.accordion') ? scope : scope.querySelector('.accordion');

         if (!accordion) {
            return;
         }

         accordion.querySelectorAll('.accordion-item').forEach(function (item) {
            var questionEl = item.querySelector('.accordion-button');
            var answerEl = item.querySelector('.accordion-body');
            var question = cleanText(questionEl && questionEl.textContent);
            var answer = cleanText(answerEl && answerEl.textContent);
            var key = question.toLowerCase();

            if (!question || !answer || seen[key]) {
               return;
            }

            seen[key] = true;
            items.push({
               question: question,
               answer: answer
            });
         });
      });

      return items;
   }

   function buildFaqPage(canonicalUrl) {
      var faqItems = getFaqItems();

      if (!faqItems.length) {
         return null;
      }

      return {
         '@type': 'FAQPage',
         '@id': canonicalUrl + '#faq',
         url: canonicalUrl,
         mainEntity: faqItems.map(function (item) {
            return {
               '@type': 'Question',
               name: item.question,
               acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer
               }
            };
         })
      };
   }

   function appendSchema(schema) {
      var existing = document.querySelector('script[data-fillvisa-schema="page"]');

      if (existing) {
         existing.remove();
      }

      var script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-fillvisa-schema', 'page');
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
   }

   function initStructuredData() {
      var canonicalUrl = getCanonicalUrl();
      var page = getPageData(canonicalUrl);

      if (!page) {
         return;
      }

      var graph = [
         buildOrganization(),
         buildWebsite(),
         buildWebPage(page, canonicalUrl),
         buildBreadcrumbList(page, canonicalUrl)
      ];

      if (page.kind === 'home' || page.kind === 'formApp') {
         graph.push(buildWebApplication(page, canonicalUrl));
      }

      if (page.kind === 'service') {
         graph.push(buildService(page, canonicalUrl));
      }

      var faqPage = buildFaqPage(canonicalUrl);

      if (faqPage) {
         graph.push(faqPage);
      }

      appendSchema({
         '@context': 'https://schema.org',
         '@graph': graph
      });
   }

   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initStructuredData);
      return;
   }

   initStructuredData();
}());
