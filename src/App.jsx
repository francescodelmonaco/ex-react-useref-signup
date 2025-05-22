import { useMemo, useState } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

export default function App() {
  // states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [spec, setSpec] = useState("");
  const [year, setYear] = useState("");
  const [desc, setDesc] = useState("");

  const isUsernameValid = useMemo(() => {
    return username.trim().length >= 6 &&
      username.split("").every(c => letters.includes(c.toLowerCase() ||
        numbers.includes(c)))
  }, [username]);

  const isPasswordValid = useMemo(() => {
    return (
      password.trim().length >= 8 &&
      password.split("").some(c => letters.includes(c)) &&
      password.split("").some(c => numbers.includes(c)) &&
      password.split("").some(c => symbols.includes(c))
    );
  }, [password]);

  const isDescValid = useMemo(() => {
    return (
      desc.trim().length >= 100 &&
      desc.trim().length < 1000
    )
  }, [desc]);

  function handleSubmit(e) {
    e.preventDefault();

    // validation
    if (
      !name.trim() ||
      !username.trim() ||
      !password.trim() ||
      !spec.trim() ||
      !year.trim() ||
      year <= 0 ||
      !desc.trim() ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isDescValid
    ) {
      alert("Errore: compila tutti i campi")
      return;
    }

    // stampo in console l'oggetto con i dati inseriti
    console.log({
      name,
      username,
      password,
      spec,
      year,
      desc
    })

    // svuoto campi
    setName("");
    setUsername("");
    setPassword("");
    setSpec("");
    setYear("");
    setDesc("");
  }

  return (
    <>
      <h1>Form di registrazione</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label>Nome e cognome</label>
          <input
            type="text"
            placeholder="Inserisci il tuo nome completo"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Username</label>
          <input
            type="text"
            placeholder="Inserisci il tuo username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          {username.trim() && (
            <p style={{ color: isUsernameValid ? "green" : "red" }}>
              {isUsernameValid ? "Username valido" : "Lo username deve essere di almeno 6 caratteri alfanumerici"}
            </p>
          )}
        </div>

        <div className="row">
          <label>Password</label>
          <input
            type="password"
            placeholder="Inserisci la tua password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {password.trim() && (
            <p style={{ color: isPasswordValid ? "green" : "red" }}>
              {isPasswordValid ? "Password valida" : "La descrizione deve essere di almeno 8 caratteri, 1 lettera, 1 numero, 1 simbolo"}
            </p>
          )}
        </div>

        <div className="row">
          <label>Specializzazione</label>
          <select
            value={spec}
            onChange={e => setSpec(e.target.value)}
          >
            <option value="">Seleziona la tua specializzazione</option>
            <option value="full-stack">Full Stack</option>
            <option value="fe">Frontend</option>
            <option value="be">Backend</option>
          </select>
        </div>

        <div className="row">
          <label>Anni di esperienza</label>
          <input
            type="number"
            placeholder="Inserisci quanti anni di esperienza hai accumulato"
            value={year}
            onChange={e => setYear(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Descrizione</label>
          <textarea
            placeholder="Descriviti in breve"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
          {desc.trim() && (
            <p style={{ color: isDescValid ? "green" : "red" }}>
              {isDescValid ? `Descrizione valida (${desc.trim().length})` : `La descrizione deve avere una lunghezza compresa tra 100 e 1000 caratteri (${desc.trim().length})`}
            </p>
          )}
        </div>

        <button type="submit">Registrati</button>
      </form>
    </>
  )
}