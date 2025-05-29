<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenue chez {{ config('app.name') }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }
        
        .email-container {
            max-width: 800px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            backdrop-filter: blur(10px);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .logo-text {
            font-size: 32px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 3px;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 2;
        }
        
        .header-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            font-weight: 400;
            margin: 15px 0 0 0;
            position: relative;
            z-index: 2;
        }
        
        .header h1 {
            color: #ffffff;
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 2;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 26px;
            color: #2d3748;
            margin-bottom: 15px;
            font-weight: 600;
            text-align: center;
        }
        
        .success-message {
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 30px;
            text-align: center;
            font-weight: 500;
            box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
        }
        
        .credentials-box {
            background: linear-gradient(135deg, #f7fafc, #edf2f7);
            border: 1px solid #e2e8f0;
            border-radius: 15px;
            padding: 25px;
            margin: 25px 0;
            position: relative;
            overflow: hidden;
        }
        
        .credentials-box::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2);
        }
        
        .credential-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding: 10px 0;
        }
        
        .credential-item:last-child {
            margin-bottom: 0;
        }
        
        .credential-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: white;
            font-weight: bold;
        }
        
        .credential-info {
            flex: 1;
        }
        
        .credential-label {
            font-weight: 700;
            color: #2d3748;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        
        .credential-value {
            color: #4a5568;
            font-size: 16px;
            font-family: 'Courier New', monospace;
            background: #ffffff;
            padding: 8px 12px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
        }
        
        .security-notice {
            background: linear-gradient(135deg, #fed7d7, #feb2b2);
            border-left: 4px solid #f56565;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
            color: #742a2a;
        }
        
        .security-notice strong {
            color: #c53030;
        }
        
        .cta-section {
            text-align: center;
            margin: 35px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .cta-button:hover::before {
            left: 100%;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
        }
        
        .footer {
            background: #2d3748;
            color: #a0aec0;
            text-align: center;
            padding: 30px;
            font-size: 14px;
        }
        
        .footer-brand {
            color: #ffffff;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 15px;
            }
            
            .header, .content {
                padding: 25px 20px;
            }
            
            .header h1 {
                font-size: 20px;
            }
            
            .logo-text {
                font-size: 24px;
                letter-spacing: 2px;
            }
            
            .greeting {
                font-size: 20px;
            }
            
            .credentials-box {
                padding: 20px;
            }
            
            .credential-item {
                flex-direction: column;
                text-align: center;
            }
            
            .credential-icon {
                margin: 0 0 10px 0;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo-text">{{ config('app.name') }}</div>
            <h1>Bienvenue dans votre espace</h1>
            <p class="header-subtitle">Votre compte a été créé avec succès</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Bonjour {{ $user->nom }} {{ $user->prenom }},
            </div>
            
            <div class="success-message">
                🎉 Votre compte a été créé avec succès !
            </div>
            
            <p style="color: #4a5568; font-size: 16px; margin-bottom: 25px; text-align: center;">
                Nous sommes ravis de vous accueillir dans notre plateforme.<br>
                Voici vos informations de connexion :
            </p>
            
            <div class="credentials-box">
                <div class="credential-item">
                    <div class="credential-icon">@</div>
                    <div class="credential-info">
                        <div class="credential-label">Email</div>
                        <div class="credential-value">{{ $user->email }}</div>
                    </div>
                </div>
                <div class="credential-item">
                    <div class="credential-icon">🔑</div>
                    <div class="credential-info">
                        <div class="credential-label">Mot de passe</div>
                        <div class="credential-value">{{ $plainPassword }}</div>
                    </div>
                </div>
            </div>
            
            <div class="security-notice">
                <strong>⚠️ Important :</strong> Pour votre sécurité, nous vous recommandons fortement de vous connecter et de changer votre mot de passe après votre première connexion.
            </div>
            
            <div class="cta-section">
                <a href="{{ url('/login') }}" class="cta-button">Se connecter maintenant</a>
            </div>
            
            <p style="color: #718096; font-size: 14px; text-align: center; margin-top: 30px;">
                Si vous avez des questions, n'hésitez pas à nous contacter.<br>
                Nous sommes là pour vous aider !
            </p>
        </div>
        
        <div class="footer">
            <div class="footer-brand">{{ config('app.name') }}</div>
            <div>© {{ date('Y') }} Tous droits réservés</div>
        </div>
    </div>
</body>
</html>