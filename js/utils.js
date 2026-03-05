
/** Set up the welcome screen */
export function setupWelcome() 
{
	const getStartedBtn = document.getElementById('get-started-btn');
	const welcomeMessage = document.getElementById('welcome-message');
	const sidebarContent = document.getElementById('sidebar-content');
	
	if (getStartedBtn)
	{
		getStartedBtn.addEventListener('click', () => 
		{
			welcomeMessage.classList.add('fade-out');
			setTimeout(() =>
			{
				welcomeMessage.style.display = 'none';
				sidebarContent.classList.remove('hidden');
			}, 500);
		});
	}
}
