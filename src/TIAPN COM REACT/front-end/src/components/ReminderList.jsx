import { useState, useEffect } from 'react';
import { getLembrete, postLembrete, deleteLembrete} from './../services/api';

const adminId = 14;

export default function ReminderList() {

  const [input, setInput] = useState('');
  const [lembretes, setlembretes] = useState ([]);

  const fetchlembretes = async () => {

    try{
      
      const data = await getLembrete();
      setlembretes(data);

    }catch(err){

      console.log(err);
    }
  }

   useEffect(() => {
      fetchlembretes();
    }, [lembretes]);

  async function addReminder() {

    const processedData = {
      observacao: input,
      administrador_codigo: 14
    };

    if (!input.trim()) return;

    let res

    try{
      
      setInput('');
      res = await postLembrete( processedData);

    }catch(er){

      console.log(er);
    }

    if (res.ok) {
      
      const updated = await res.json();
      setlembretes((prev) => [...prev, updated]);
    }
  }


  async function removeReminder(id) {
    try{
        const res = await deleteLembrete( id);
    }catch(er){
      console.log(er);
    }
    
    setlembretes((prev) => prev.filter((r) => r.Codigo !== id));
  }

  return (
    <div className="widget reminders">
      <h5>Lembretes</h5>
      <div className="reminder-input">
        <i className="fa fa-pen"></i>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addReminder()}
          placeholder="Adicione um lembrete..."
        />
      </div>
      <ul className="reminder-list">
        {lembretes.length === 0 ? (
          <li className="empty-reminder">
            <i className="fa fa-info-circle"></i> Nenhum lembrete adicionado ainda.
          </li>
        ) : (
          lembretes.map((r) => (
            <li key={r.Codigo}>
              <input type="checkbox" />
              <span>{r.Observacao}</span>
              <span className="delete" onClick={() => removeReminder(r.Codigo)}>🗑️</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
