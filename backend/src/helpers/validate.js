export const validateRegister = (req) => {
  if (!req.body.name) {
    throw new Error("EL campo 'name' es requerido");
  }

  if (!req.body.email) {
    throw new Error("EL campo 'email' es requerido");
  }

  if (!req.body.password) {
    throw new Error("EL campo 'password' es requerido");
  }

  if (!req.body.expertise) {
    throw new Error("EL campo 'expertise' es requerido");
  }

  if (!req.body.specialty) {
    throw new Error("EL campo 'specialty' es requerido");
  }

};

export const validateLogin = (req) => { 
  if (!req.body.email) {
    throw new Error("EL campo 'email' es requerido");
  }

  if (!req.body.password) {
    throw new Error("EL campo 'password' es requerido");
  }
}