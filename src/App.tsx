const App = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '40px',
        marginBottom: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#2d5016',
          margin: '0 0 10px 0',
          fontWeight: 'bold'
        }}>
          🌾 AgriConnect
        </h1>
        <p style={{
          fontSize: '1.3rem',
          color: '#4a6741',
          margin: '0 0 20px 0'
        }}>
          פלטפורמה חכמה לניהול חוות חקלאיות
        </p>
        <p style={{
          fontSize: '1rem',
          color: '#666',
          margin: '0'
        }}>
          חיבור חקלאים, ניהול חוות, והדרכה מקצועית
        </p>
      </div>

      {/* Main Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Login Button */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          transition: 'transform 0.3s ease'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔐</div>
          <h3 style={{ color: '#2d5016', margin: '0 0 15px 0', fontSize: '1.5rem' }}>
            התחברות
          </h3>
          <p style={{ color: '#666', margin: '0 0 20px 0' }}>
            התחבר לחשבון שלך
          </p>
          <button style={{
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '25px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.3s ease'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.background = '#45a049'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.background = '#4CAF50'}
          >
            התחבר עכשיו
          </button>
        </div>

        {/* Register Button */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          transition: 'transform 0.3s ease'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📝</div>
          <h3 style={{ color: '#2d5016', margin: '0 0 15px 0', fontSize: '1.5rem' }}>
            הרשמה
          </h3>
          <p style={{ color: '#666', margin: '0 0 20px 0' }}>
            צור חשבון חדש
          </p>
          <button style={{
            background: '#2196F3',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '25px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.3s ease'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.background = '#1976D2'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.background = '#2196F3'}
          >
            הירשם עכשיו
          </button>
        </div>

        {/* Poultry Guide Button */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          transition: 'transform 0.3s ease'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🐔</div>
          <h3 style={{ color: '#2d5016', margin: '0 0 15px 0', fontSize: '1.5rem' }}>
            הקמת לולים
          </h3>
          <p style={{ color: '#666', margin: '0 0 20px 0' }}>
            מדריך מקצועי עדכני
          </p>
          <button style={{
            background: '#FF9800',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '25px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.3s ease'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.background = '#F57C00'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.background = '#FF9800'}
          >
            למד עוד
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{ color: '#2d5016', margin: '0 0 20px 0', fontSize: '2rem' }}>
          תכונות הפלטפורמה
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🏡</div>
            <h4 style={{ color: '#2d5016', margin: '0 0 5px 0' }}>ניהול חווה</h4>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0' }}>מעקב אחר בעלי חיים ויבולים</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🐔</div>
            <h4 style={{ color: '#2d5016', margin: '0 0 5px 0' }}>הקמת לולים</h4>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0' }}>מדריכים מקצועיים להקמת לולי תרנגולות</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🌍</div>
            <h4 style={{ color: '#2d5016', margin: '0 0 5px 0' }}>חיבור גלובלי</h4>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0' }}>קשר עם חקלאים ברחבי העולם</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📚</div>
            <h4 style={{ color: '#2d5016', margin: '0 0 5px 0' }}>הדרכה</h4>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0' }}>מדריכים וטיפים מקצועיים</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📱</div>
            <h4 style={{ color: '#2d5016', margin: '0 0 5px 0' }}>התראות</h4>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0' }}>עדכונים בזמן אמת</p>
          </div>
        </div>
      </div>

      {/* Poultry Information Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '15px',
        padding: '30px',
        marginTop: '20px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{ color: '#2d5016', margin: '0 0 20px 0', fontSize: '2rem', textAlign: 'center' }}>
          🐔 מידע עדכני על הקמת לולים - 2025
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            border: '2px solid #4CAF50'
          }}>
            <h3 style={{ color: '#2d5016', margin: '0 0 10px 0' }}>💰 תמיכה ממשלתית</h3>
            <ul style={{ color: '#666', margin: '0', paddingLeft: '20px' }}>
              <li>תקציב של 80 מיליון ש"ח לשדרוג לולים</li>
              <li>תמיכה בלולים נטולי כלובים</li>
              <li>הקמת מתחמי לולים מודרניים</li>
              <li>תמיכה דיפרנציאלית לפי סוג הלול</li>
            </ul>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            border: '2px solid #2196F3'
          }}>
            <h3 style={{ color: '#2d5016', margin: '0 0 10px 0' }}>📋 דרישות רגולטוריות</h3>
            <ul style={{ color: '#666', margin: '0', paddingLeft: '20px' }}>
              <li>עמידה בדרישות וטרינריות</li>
              <li>בטיחות ביולוגית גבוהה</li>
              <li>רווחת בעלי החיים</li>
              <li>השפעה סביבתית מינימלית</li>
            </ul>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            border: '2px solid #FF9800'
          }}>
            <h3 style={{ color: '#2d5016', margin: '0 0 10px 0' }}>🏗️ תכנון הלול</h3>
            <ul style={{ color: '#666', margin: '0', paddingLeft: '20px' }}>
              <li>מיקום מחוץ ליישובים</li>
              <li>מרחק ממקורות מים</li>
              <li>מערכת אוורור מתקדמת</li>
              <li>תאורה וחימום אוטומטיים</li>
            </ul>
          </div>
        </div>

        <div style={{
          background: '#e8f5e8',
          padding: '20px',
          borderRadius: '10px',
          border: '2px solid #4CAF50',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#2d5016', margin: '0 0 10px 0' }}>📞 לקבלת מידע נוסף</h3>
          <p style={{ color: '#666', margin: '0' }}>
            פנה למשרד החקלאות וביטחון המזון או לאגודות החקלאיות לקבלת הנחיות מפורטות
          </p>
        </div>

        {/* Sri Lanka Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '30px',
          marginTop: '20px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        }}>
          <h2 style={{ color: '#2d5016', margin: '0 0 20px 0', fontSize: '2rem', textAlign: 'center' }}>
            🇱🇰 מותאם לסטודנטים בסרי לנקה
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: '#fff3e0',
              padding: '20px',
              borderRadius: '10px',
              border: '2px solid #FF9800'
            }}>
              <h3 style={{ color: '#2d5016', margin: '0 0 10px 0' }}>🎓 תוכניות לימודים</h3>
              <ul style={{ color: '#666', margin: '0', paddingLeft: '20px' }}>
                <li>אוניברסיטאות חקלאיות בסרי לנקה</li>
                <li>קורסים בניהול לולים</li>
                <li>תוכניות הכשרה מעשית</li>
                <li>מחקר בחקלאות טרופית</li>
              </ul>
            </div>

            <div style={{
              background: '#e3f2fd',
              padding: '20px',
              borderRadius: '10px',
              border: '2px solid #2196F3'
            }}>
              <h3 style={{ color: '#2d5016', margin: '0 0 10px 0' }}>🌡️ תנאי אקלים</h3>
              <ul style={{ color: '#666', margin: '0', paddingLeft: '20px' }}>
                <li>אקלים טרופי לח</li>
                <li>עונות גשומות ויבשות</li>
                <li>אוורור מתקדם נדרש</li>
                <li>הגנה מפני גשמים</li>
              </ul>
            </div>

            <div style={{
              background: '#f3e5f5',
              padding: '20px',
              borderRadius: '10px',
              border: '2px solid #9C27B0'
            }}>
              <h3 style={{ color: '#2d5016', margin: '0 0 10px 0' }}>📚 משאבי למידה</h3>
              <ul style={{ color: '#666', margin: '0', paddingLeft: '20px' }}>
                <li>מדריכים בשפה המקומית</li>
                <li>סרטוני הדרכה</li>
                <li>פורומים לסטודנטים</li>
                <li>מנטורים מקצועיים</li>
              </ul>
            </div>
          </div>

          <div style={{
            background: '#e8f5e8',
            padding: '20px',
            borderRadius: '10px',
            border: '2px solid #4CAF50',
            textAlign: 'center',
            marginTop: '20px'
          }}>
            <h3 style={{ color: '#2d5016', margin: '0 0 10px 0' }}>🌍 חיבור בינלאומי</h3>
            <p style={{ color: '#666', margin: '0' }}>
              חיבור עם חקלאים בישראל ובעולם לשיתוף ידע וניסיון
            </p>
          </div>
        </div>

        {/* Israel Workers & Students Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '30px',
          marginTop: '20px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        }}>
          <h2 style={{ color: '#2d5016', margin: '0 0 20px 0', fontSize: '2rem', textAlign: 'center' }}>
            🇮🇱 כלי עזר לעובדים וסטודנטים בישראל
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: '#fff8e1',
              padding: '20px',
              borderRadius: '10px',
              border: '2px solid #FFC107'
            }}>
              <h3 style={{ color: '#2d5016', margin: '0 0 10px 0' }}>👷 עובדים זרים</h3>
              <ul style={{ color: '#666', margin: '0', paddingLeft: '20px' }}>
                <li>מדריכים בעברית פשוטה</li>
                <li>תרגום לשפות שונות</li>
                <li>הכשרה מעשית בלולים</li>
                <li>תמיכה טכנית 24/7</li>
              </ul>
            </div>

            <div style={{
              background: '#e8f5e8',
              padding: '20px',
              borderRadius: '10px',
              border: '2px solid #4CAF50'
            }}>
              <h3 style={{ color: '#2d5016', margin: '0 0 10px 0' }}>🎓 סטודנטים</h3>
              <ul style={{ color: '#666', margin: '0', paddingLeft: '20px' }}>
                <li>תוכניות חילופי סטודנטים</li>
                <li>סטאז'ים בחוות ישראליות</li>
                <li>מחקר משותף</li>
                <li>הכשרה מקצועית</li>
              </ul>
            </div>

            <div style={{
              background: '#e3f2fd',
              padding: '20px',
              borderRadius: '10px',
              border: '2px solid #2196F3'
            }}>
              <h3 style={{ color: '#2d5016', margin: '0 0 10px 0' }}>🌱 חקלאות ישראלית</h3>
              <ul style={{ color: '#666', margin: '0', paddingLeft: '20px' }}>
                <li>טכנולוגיות מתקדמות</li>
                <li>שיטות השקיה חכמות</li>
                <li>ניהול מודרני</li>
                <li>קיימות וסביבה</li>
              </ul>
            </div>
          </div>

          <div style={{
            background: '#f3e5f5',
            padding: '20px',
            borderRadius: '10px',
            border: '2px solid #9C27B0',
            textAlign: 'center',
            marginTop: '20px'
          }}>
            <h3 style={{ color: '#2d5016', margin: '0 0 10px 0' }}>🤝 שיתוף פעולה</h3>
            <p style={{ color: '#666', margin: '0' }}>
              חיבור בין עובדים זרים, סטודנטים וחקלאים ישראלים ללמידה הדדית ופיתוח החקלאות
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
