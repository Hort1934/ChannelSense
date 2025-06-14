export function getMockResponse(action: string, query: string): string {
  if (action === 'analytics') {
    if (query.includes('активність')) {
      return '🔹 Цього тижня активність знизилась на 30%.';
    } else if (query.includes('засновники') && query.includes('шукають')) {
      return '🔹 У /founders 3 касти зі словами "looking for cofounder".';
    }
  }

  if (action === 'manage') {
    if (query.includes('додати')) {
      return '🔹 Користувач із FID: 0x123 доданий до каналу.';
    } else if (query.includes('топ')) {
      return `🔹 Топ-3 учасники:
1. @user1 (50 лайків)
2. @user2 (30 відповідей)
3. @user3 (10 кастів)`
    }
  }

  if (action === 'report') {
    return '🔹 Звіт: 5 нових кастів, 2 запити на співзасновників.';
  }

  return '🔸 Не вдалося знайти відповідь. Спробуйте інше формулювання.';
}
