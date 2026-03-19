using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.User.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(IUserRepository userRepository, ILogger<AddHandler> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var user = new Domain.Entities.User
            {
                Username = request.Username,
                Email = request.Email,
                Name = request.Name,
                Surname = request.Surname,
                Password = request.Password,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _userRepository.AddAsync(user, cancellationToken);

            return new AddResponse(user.Id);
        }
    }
}
