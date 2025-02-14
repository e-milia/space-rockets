export default {
  data: {
    flight_number: 100,
    mission_name: 'Starlink-10 (v1.0) & SkySat 19-21',
    mission_id: [],
    launch_year: '2020',
    launch_date_unix: 1597761060,
    launch_date_utc: '2020-08-18T14:31:00.000Z',
    launch_date_local: '2020-08-18T10:31:00-04:00',
    is_tentative: false,
    tentative_max_precision: 'hour',
    tbd: false,
    launch_window: 0,
    rocket: {
      rocket_id: 'falcon9',
      rocket_name: 'Falcon 9',
      rocket_type: 'FT',
      first_stage: {
        cores: [{
          core_serial: 'B1049', flight: 6, block: 5, gridfins: true, legs: true, reused: true, land_success: true, landing_intent: true, landing_type: 'ASDS', landing_vehicle: 'OCISLY',
        }],
      },
      second_stage: {
        block: 5,
        payloads: [{
          payload_id: 'Starlink-10',
          norad_id: [45730, 45731, 45732, 45733, 45734, 45735, 45736, 45737, 45738, 45739, 45740, 45741, 45742, 45743, 45744, 45745, 45746, 45747, 45748, 45749, 45750, 45751],
          reused: false,
          customers: ['SpaceX'],
          nationality: 'United States',
          manufacturer: 'SpaceX',
          payload_type: 'Satellite',
          payload_mass_kg: 15400,
          payload_mass_lbs: 33951.2,
          orbit: 'VLEO',
          orbit_params: {
            reference_system: 'geocentric', regime: 'very-low-earth', longitude: null, semi_major_axis_km: null, eccentricity: null, periapsis_km: null, apoapsis_km: null, inclination_deg: null, period_min: null, lifespan_years: null, epoch: null, mean_motion: null, raan: null, arg_of_pericenter: null, mean_anomaly: null,
          },
        }],
      },
      fairings: {
        reused: true, recovery_attempt: true, recovered: true, ship: 'GOMSTREE',
      },
    },
    ships: ['GOMSTREE', 'GOMSCHIEF', 'OCISLY', 'GOQUEST'],
    telemetry: { flight_club: null },
    launch_site: { site_id: 'ccafs_slc_40', site_name: 'CCAFS SLC 40', site_name_long: 'Cape Canaveral Air Force Station Space Launch Complex 40' },
    launch_success: true,
    links: {
      mission_patch: 'https://images2.imgbox.com/d2/3b/bQaWiil0_o.png', mission_patch_small: 'https://images2.imgbox.com/9a/96/nLppz9HW_o.png', reddit_campaign: 'https://www.reddit.com/r/spacex/comments/i63bst/starlink_general_discussion_and_deployment_thread/', reddit_launch: 'https://www.reddit.com/r/spacex/comments/ibacxz/rspacex_starlink10_launch_discussion_updates/', reddit_recovery: 'https://www.reddit.com/r/spacex/comments/ic46fw/starlink10_recovery_updates_discussion_thread/', reddit_media: 'https://www.reddit.com/r/spacex/comments/ic29wg/rspacex_starlink10_media_thread_photographer/', presskit: null, article_link: 'https://spaceflightnow.com/2020/08/18/spacex-adds-more-satellites-to-ever-growing-starlink-network/', wikipedia: 'https://en.wikipedia.org/wiki/Starlink', video_link: 'https://youtu.be/jTMJK7wb0rM', youtube_id: 'jTMJK7wb0rM', flickr_images: ['https://live.staticflickr.com/65535/50241845831_9a7412e81d_o.jpg', 'https://live.staticflickr.com/65535/50242057637_ea4f98d517_o.jpg', 'https://live.staticflickr.com/65535/50242057682_6084977bf7_o.jpg', 'https://live.staticflickr.com/65535/50242057677_e96fbd46e6_o.jpg'],
    },
    details: 'This mission will launch the tenth batch of operational Starlink satellites, which are expected to be version 1.0, from LC-39A, Kennedy Space Center. It is the eleventh Starlink launch overall. The satellites will be delivered to low Earth orbit and will spend a few weeks maneuvering to their operational altitude of 550 km. This mission is includes rideshare payloads, SkySats 19-21, on top of the Starlink stack. The booster for this mission is expected to land on an ASDS.',
    upcoming: false,
    static_fire_date_utc: null,
    static_fire_date_unix: null,
    timeline: null,
    crew: null,
    last_date_update: '2020-08-15T02:21:25.000Z',
    last_ll_launch_date: null,
    last_ll_update: null,
    last_wiki_launch_date: '2020-08-18T14:31:00.000Z',
    last_wiki_revision: '042bcead-de9e-11ea-b6d9-0e010ab9f931',
    last_wiki_update: '2020-08-15T02:21:25.000Z',
    launch_date_source: 'wiki',
  },
  error: null,
};
