using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.RegularUser.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IRegularUserRepository _regularUserRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IRegularUserRepository regularUserRepository, ILogger<GetHandler> logger)
        {
            _regularUserRepository = regularUserRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var regularUser = await _regularUserRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(regularUser);
        }
    }
}
