using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.User.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IUserRepository userRepository, ILogger<GetHandler> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(user);
        }
    }
}
