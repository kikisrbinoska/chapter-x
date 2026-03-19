using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.RegularUser.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IRegularUserRepository _regularUserRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IRegularUserRepository regularUserRepository, ILogger<GetAllHandler> logger)
        {
            _regularUserRepository = regularUserRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var regularUsers = await _regularUserRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(regularUsers);
        }
    }
}
