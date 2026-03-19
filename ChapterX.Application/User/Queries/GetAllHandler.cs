using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.User.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IUserRepository userRepository, ILogger<GetAllHandler> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var users = await _userRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(users);
        }
    }
}
