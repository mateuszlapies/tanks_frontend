import cfg from "../Content/config.json";
export default process.env.NODE_ENV === 'development' ? cfg.dev : cfg.prod;
