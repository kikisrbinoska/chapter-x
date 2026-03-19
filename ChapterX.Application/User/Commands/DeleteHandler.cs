using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.User.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(IUserRepository userRepository, ILogger<DeleteHandler> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByIdAsync(request.Id, cancellationToken);
            if (user is null)
                return new DeleteResponse(false);

            await _userRepository.DeleteAsync(user, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
