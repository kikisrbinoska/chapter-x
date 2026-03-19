using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.User.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(IUserRepository userRepository, ILogger<UpdateHandler> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByIdAsync(request.Id, cancellationToken);
            if (user is null)
                return new UpdateResponse(false);

            user.Username = request.Username;
            user.Email = request.Email;
            user.Name = request.Name;
            user.Surname = request.Surname;
            user.UpdatedAt = DateTime.UtcNow;

            await _userRepository.UpdateAsync(user, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
