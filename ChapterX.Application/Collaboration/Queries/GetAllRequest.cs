using MediatR;

namespace ChapterX.Application.Collaboration.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
