
import './styles.css';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';

function AvatarLetras({ nomeAvatar }) {
  const [iniciaisAvatar, setIniciaisAvatar] = useState('')

  useEffect(() => extrairIniciais(nomeAvatar), [nomeAvatar])

  function extrairIniciais(nomeAvatar) {
    let iniciais;
    let iniciaisArray = [];
    let nomeAuxiliar = nomeAvatar;

    if (nomeAvatar) {
      const nomeSplit = nomeAuxiliar.split(' ');

      if (nomeSplit.length === 1) {
        const letrasSplit = nomeSplit[0].split('');
        iniciaisArray.push(letrasSplit[0].toUpperCase())
      } else {
        for (let i = 0; i < 2; i++) {
          const letrasSplit = nomeSplit[i].split('');
          iniciaisArray.push(letrasSplit[0].toUpperCase())
        }
      }
      iniciais = iniciaisArray.join('');
      setIniciaisAvatar(iniciais)
    }
  }

  return (
    <div className="app">
      <Avatar
        sx={{
          bgcolor: `var(--cinza-medio)`,
          color: `var(--verde-normal)`,
          width: 48,
          height: 48,
          fontFamily: "Nunito",
          fontSize: 22,
          fontWeight: 600,
          lineHeight: 30,
        }}
      >
        {iniciaisAvatar}
      </Avatar>
    </div>
  );
}

export default AvatarLetras;
